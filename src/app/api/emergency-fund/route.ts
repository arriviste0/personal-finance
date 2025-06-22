
import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { EmergencyFundSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getOrCreateFund(userId: ObjectId): Promise<EmergencyFundSchema> {
    const client = await clientPromise;
    const db = client.db();
    const emergencyFundsCollection = db.collection<EmergencyFundSchema>('emergencyFunds');

    let fund = await emergencyFundsCollection.findOne({ userId });

    if (!fund) {
        const newFund: Omit<EmergencyFundSchema, '_id'> = {
            userId,
            targetAmount: 15000, // Default target
            currentAmount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const result = await emergencyFundsCollection.insertOne(newFund as EmergencyFundSchema);
        fund = { ...newFund, _id: result.insertedId };
    }
    
    return fund;
}


/**
 * GET /api/emergency-fund
 * Fetches the emergency fund for the authenticated user.
 */
export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = new ObjectId(session.user.id);

    try {
        const fund = await getOrCreateFund(userId);
        return NextResponse.json(fund, { status: 200 });
    } catch (error) {
        console.error('Error fetching emergency fund:', error);
        return NextResponse.json({ message: 'Failed to fetch emergency fund' }, { status: 500 });
    }
}

/**
 * PUT /api/emergency-fund
 * Updates the emergency fund for the authenticated user.
 */
export async function PUT(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = new ObjectId(session.user.id);
    
    try {
        const body = await request.json() as { targetAmount?: number };

        if (typeof body.targetAmount !== 'number' || body.targetAmount < 0) {
            return NextResponse.json({ message: 'Invalid target amount' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const emergencyFundsCollection = db.collection<EmergencyFundSchema>('emergencyFunds');
        
        const result = await emergencyFundsCollection.findOneAndUpdate(
            { userId },
            { $set: { targetAmount: body.targetAmount, updatedAt: new Date() } },
            { upsert: true, returnDocument: 'after' }
        );

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error updating emergency fund:', error);
        return NextResponse.json({ message: 'Failed to update emergency fund' }, { status: 500 });
    }
}
