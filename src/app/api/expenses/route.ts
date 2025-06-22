
import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { TransactionSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * GET /api/expenses
 * Fetches all expense transactions for the authenticated user.
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
    const transactionsCollection = db.collection<TransactionSchema>('transactions');
    
    // You can add filtering from query params here later if needed
    // For now, fetching all transactions for the user
    const expenses = await transactionsCollection.find({ userId }).sort({ date: -1 }).toArray();

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ message: 'Failed to fetch expenses' }, { status: 500 });
  }
}

/**
 * POST /api/expenses
 * Creates a new expense transaction for the authenticated user.
 */
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  try {
    const body = await request.json() as Omit<TransactionSchema, '_id' | 'userId' | 'createdAt' | 'updatedAt'>;

    if (!body.description || !body.category || typeof body.amount !== 'number') {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newTransaction: Omit<TransactionSchema, '_id'> = {
      ...body,
      userId: userId,
      date: new Date(body.date), // Ensure date is a Date object
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db();
    const transactionsCollection = db.collection<TransactionSchema>('transactions');

    const result = await transactionsCollection.insertOne(newTransaction as TransactionSchema);
    const createdTransaction = { ...newTransaction, _id: result.insertedId };

    // TODO: Optionally, find the budget for the month and update the 'spent' amount

    return NextResponse.json(createdTransaction, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ message: 'Failed to create expense' }, { status: 500 });
  }
}
