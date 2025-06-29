import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { TransactionSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface RouteParams {
  params: {
    expenseId: string;
  };
}

/**
 * PUT /api/expenses/[expenseId]
 * Updates a specific expense transaction by its ID.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { expenseId } = params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(expenseId)) {
    return NextResponse.json({ message: 'Invalid expense ID' }, { status: 400 });
  }

  try {
    const body = await request.json() as Partial<Omit<TransactionSchema, '_id' | 'userId' | 'createdAt'>>;
    
    // Ensure date is a Date object if provided
    if (body.date) {
        body.date = new Date(body.date);
    }
    
    const updateData = { ...body, updatedAt: new Date() };

    const client = await clientPromise;
    const db = client.db();
    const transactionsCollection = db.collection<TransactionSchema>('transactions');

    const result = await transactionsCollection.findOneAndUpdate(
      { _id: new ObjectId(expenseId), userId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ message: 'Expense not found or unauthorized' }, { status: 404 });
    }

    // TODO: Update budget spent amount if category/amount changed

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(`Error updating expense ${expenseId}:`, error);
    return NextResponse.json({ message: 'Failed to update expense' }, { status: 500 });
  }
}

/**
 * DELETE /api/expenses/[expenseId]
 * Deletes a specific expense transaction by its ID.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { expenseId } = await params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(expenseId)) {
    return NextResponse.json({ message: 'Invalid expense ID' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const transactionsCollection = db.collection<TransactionSchema>('transactions');

    const result = await transactionsCollection.deleteOne({ _id: new ObjectId(expenseId), userId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Expense not found or unauthorized' }, { status: 404 });
    }

    // TODO: Update budget spent amount after deletion

    return NextResponse.json({ message: 'Expense deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting expense ${expenseId}:`, error);
    return NextResponse.json({ message: 'Failed to delete expense' }, { status: 500 });
  }
}

/**
 * GET /api/expenses/[expenseId]
 * Retrieves a specific expense transaction by its ID.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { expenseId } = await params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(expenseId)) {
    return NextResponse.json({ message: 'Invalid expense ID' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const transactionsCollection = db.collection<TransactionSchema>('transactions');

    const result = await transactionsCollection.findOne({ _id: new ObjectId(expenseId), userId });

    if (!result) {
      return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(`Error retrieving expense ${expenseId}:`, error);
    return NextResponse.json({ message: 'Failed to retrieve expense' }, { status: 500 });
  }
}
