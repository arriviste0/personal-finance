
import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { SavingsGoalSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * GET /api/savings-goals
 * Fetches all savings goals for the authenticated user.
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
    const savingsGoalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');

    const goals = await savingsGoalsCollection.find({ userId: userId }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(goals, { status: 200 });
  } catch (error) {
    console.error('Error fetching savings goals:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to fetch savings goals', error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/savings-goals
 * Creates a new savings goal for the authenticated user.
 */
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  try {
    const body = await request.json() as Omit<SavingsGoalSchema, '_id' | 'userId' | 'createdAt' | 'updatedAt' | 'currentAmount' | 'isComplete'>;

    if (!body.name || !body.targetAmount || body.targetAmount <= 0) {
      return NextResponse.json({ message: 'Goal name and a positive target amount are required.' }, { status: 400 });
    }

    const newGoal: Omit<SavingsGoalSchema, '_id'> = {
      ...body,
      userId: userId,
      currentAmount: 0,
      isComplete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db();
    const savingsGoalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');

    const result = await savingsGoalsCollection.insertOne(newGoal as SavingsGoalSchema);
    const createdGoal = { ...newGoal, _id: result.insertedId };

    return NextResponse.json(createdGoal, { status: 201 });
  } catch (error) {
    console.error('Error creating savings goal:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to create savings goal', error: errorMessage }, { status: 500 });
  }
}
