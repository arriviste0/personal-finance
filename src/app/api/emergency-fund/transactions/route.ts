
import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId, type MongoClient } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { EmergencyFundSchema, EmergencyFundTransactionSchema, UserSchema } from '@/lib/db-schemas';

/**
 * GET /api/emergency-fund/transactions
 * Fetches all transactions for the user's emergency fund.
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
        const transactionsCollection = db.collection<EmergencyFundTransactionSchema>('emergencyFundTransactions');

        const transactions = await transactionsCollection.find({ userId }).sort({ date: -1 }).toArray();

        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        console.error('Error fetching emergency fund transactions:', error);
        return NextResponse.json({ message: 'Failed to fetch transactions' }, { status: 500 });
    }
}


/**
 * POST /api/emergency-fund/transactions
 * Creates a new transaction and updates the fund's balance.
 */
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = new ObjectId(session.user.id);
    let mongoClient: MongoClient | undefined;

    try {
        const { amount, type, notes } = await request.json() as { amount: number; type: 'deposit' | 'withdrawal'; notes?: string };
        
        if (typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
        }

        mongoClient = await clientPromise;
        const db = mongoClient.db();
        const usersCollection = db.collection<UserSchema>('users');
        const fundsCollection = db.collection<EmergencyFundSchema>('emergencyFunds');
        const transactionsCollection = db.collection<EmergencyFundTransactionSchema>('emergencyFundTransactions');
        
        const dbSession = mongoClient.startSession();

        let createdTransaction;
        await dbSession.withTransaction(async () => {
            const user = await usersCollection.findOne({ _id: userId }, { session: dbSession });
            let fund = await fundsCollection.findOne({ userId: userId }, { session: dbSession });
            
            if (!user) throw new Error('User not found');
            if (!fund) { // Create fund if it doesn't exist
                const newFundData: Omit<EmergencyFundSchema, '_id'> = { userId, currentAmount: 0, targetAmount: 15000, createdAt: new Date(), updatedAt: new Date()};
                const created = await fundsCollection.insertOne(newFundData as EmergencyFundSchema, { session: dbSession });
                fund = {...newFundData, _id: created.insertedId};
            }

            const incAmount = type === 'deposit' ? amount : -amount;

            if (type === 'deposit' && user.walletBalance < amount) {
                throw new Error('Insufficient wallet balance');
            }
            if (type === 'withdrawal' && fund.currentAmount < amount) {
                throw new Error('Insufficient funds in emergency fund');
            }

            // Update balances
            await usersCollection.updateOne({ _id: userId }, { $inc: { walletBalance: -incAmount } }, { session: dbSession });
            await fundsCollection.updateOne({ _id: fund._id }, { $inc: { currentAmount: incAmount } }, { session: dbSession });

            // Log transaction
            const newTransaction: Omit<EmergencyFundTransactionSchema, '_id'> = {
                userId,
                date: new Date(),
                type,
                amount,
                notes,
                createdAt: new Date(),
            };
            const result = await transactionsCollection.insertOne(newTransaction as EmergencyFundTransactionSchema, { session: dbSession });
            createdTransaction = { ...newTransaction, _id: result.insertedId };
        });

        await dbSession.endSession();
        return NextResponse.json(createdTransaction, { status: 201 });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Transaction failed';
        return NextResponse.json({ message }, { status: 500 });
    }
}
