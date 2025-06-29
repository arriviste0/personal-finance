import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { SavingsGoalSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface RouteParams {
  params: {
    goalId: string;
  };
}

/**
 * GET /api/savings-goals/[goalId]
 * Fetches a specific savings goal by its ID for the authenticated user.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { goalId } = await params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(goalId)) {
    return NextResponse.json({ message: 'Invalid goal ID format' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const savingsGoalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');

    const goal = await savingsGoalsCollection.findOne({ _id: new ObjectId(goalId), userId: userId });

    if (!goal) {
      return NextResponse.json({ message: 'Savings goal not found' }, { status: 404 });
    }

    return NextResponse.json(goal, { status: 200 });
  } catch (error) {
    console.error(`Error fetching savings goal ${goalId}:`, error);
    return NextResponse.json({ message: 'Failed to fetch savings goal' }, { status: 500 });
  }
}

/**
 * PUT /api/savings-goals/[goalId]
 * Updates a specific savings goal by its ID for the authenticated user.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { goalId } = await params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(goalId)) {
    return NextResponse.json({ message: 'Invalid goal ID format' }, { status: 400 });
  }

  try {
    const body = await request.json() as Partial<Omit<SavingsGoalSchema, '_id' | 'userId' | 'createdAt' | 'currentAmount'>>;
    
    const { isComplete, ...updateData } = body;

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'No update data provided' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const savingsGoalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');

    const result = await savingsGoalsCollection.findOneAndUpdate(
      { _id: new ObjectId(goalId), userId: userId },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ message: 'Savings goal not found or not owned by user' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(`Error updating savings goal ${goalId}:`, error);
    return NextResponse.json({ message: 'Failed to update savings goal' }, { status: 500 });
  }
}

/**
 * DELETE /api/savings-goals/[goalId]
 * Deletes a specific savings goal by its ID for the authenticated user.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { goalId } = await params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(goalId)) {
    return NextResponse.json({ message: 'Invalid goal ID format' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const savingsGoalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');

    const result = await savingsGoalsCollection.deleteOne({ _id: new ObjectId(goalId), userId: userId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Savings goal not found or not owned by user' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Savings goal deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting savings goal ${goalId}:`, error);
    return NextResponse.json({ message: 'Failed to delete savings goal' }, { status: 500 });
  }
}
