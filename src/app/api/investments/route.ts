
import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { InvestmentSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * GET /api/investments
 * Fetches all investments for the authenticated user.
 */
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  try {
    const client = await clientPromise;
    const db = client.db();
    const investmentsCollection = db.collection<InvestmentSchema>('investments');
    
    const investments = await investmentsCollection.find({ userId }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(investments, { status: 200 });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json({ message: 'Failed to fetch investments' }, { status: 500 });
  }
}

/**
 * POST /api/investments
 * Creates a new investment for the authenticated user.
 */
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  try {
    const body = await request.json() as Omit<InvestmentSchema, '_id' | 'userId' | 'createdAt' | 'updatedAt'>;

    if (!body.name || !body.type || typeof body.value !== 'number') {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newInvestment: Omit<InvestmentSchema, '_id'> = {
      ...body,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db();
    const investmentsCollection = db.collection<InvestmentSchema>('investments');

    const result = await investmentsCollection.insertOne(newInvestment as InvestmentSchema);
    const createdInvestment = { ...newInvestment, _id: result.insertedId };

    return NextResponse.json(createdInvestment, { status: 201 });
  } catch (error) {
    console.error('Error creating investment:', error);
    return NextResponse.json({ message: 'Failed to create investment' }, { status: 500 });
  }
}
