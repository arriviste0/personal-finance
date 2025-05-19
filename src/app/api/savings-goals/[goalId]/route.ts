
import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { SavingsGoalSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
// To get the authenticated user's session:
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
  const { goalId } = params;
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }
  // const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(goalId)) {
    return NextResponse.json({ message: 'Invalid goal ID format' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const savingsGoalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');

    // In a real app, you'd also filter by userId: { _id: new ObjectId(goalId), userId: userId }
    const goal = await savingsGoalsCollection.findOne({ _id: new ObjectId(goalId) });

    if (!goal) {
      return NextResponse.json({ message: 'Savings goal not found' }, { status: 404 });
    }

    // Ensure the authenticated user owns this goal (if session.user.id !== goal.userId.toString()) return 403

    return NextResponse.json({ message: 'Savings goal fetched successfully', data: goal }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching savings goal ${goalId}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to fetch savings goal', error: errorMessage }, { status: 500 });
  }
}

/**
 * PUT /api/savings-goals/[goalId]
 * Updates a specific savings goal by its ID for the authenticated user.
 * Request Body: Partial<Omit<SavingsGoalSchema, '_id' | 'userId' | 'createdAt' | 'updatedAt'>>
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { goalId } = params;
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }
  // const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(goalId)) {
    return NextResponse.json({ message: 'Invalid goal ID format' }, { status: 400 });
  }

  try {
    const body = await request.json() as Partial<Omit<SavingsGoalSchema, '_id' | 'userId' | 'createdAt'>>;
    
    // Remove fields that shouldn't be directly updated this way
    const { currentAmount, isComplete, ...updateData } = body;


    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'No update data provided' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const savingsGoalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');

    // In a real app, ensure the user owns the goal before updating.
    // const existingGoal = await savingsGoalsCollection.findOne({ _id: new ObjectId(goalId), userId: userId });
    // if (!existingGoal) {
    //   return NextResponse.json({ message: 'Savings goal not found or unauthorized' }, { status: 404 });
    // }

    const result = await savingsGoalsCollection.updateOne(
      { _id: new ObjectId(goalId) /*, userId: userId */ }, // Add userId check here
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Savings goal not found or not owned by user' }, { status: 404 });
    }

    const updatedGoal = await savingsGoalsCollection.findOne({ _id: new ObjectId(goalId) });

    return NextResponse.json({ message: 'Savings goal updated successfully', data: updatedGoal }, { status: 200 });
  } catch (error) {
    console.error(`Error updating savings goal ${goalId}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to update savings goal', error: errorMessage }, { status: 500 });
  }
}

/**
 * DELETE /api/savings-goals/[goalId]
 * Deletes a specific savings goal by its ID for the authenticated user.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { goalId } = params;
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }
  // const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(goalId)) {
    return NextResponse.json({ message: 'Invalid goal ID format' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const savingsGoalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');

    // In a real app, ensure the user owns the goal before deleting.
    const result = await savingsGoalsCollection.deleteOne({ _id: new ObjectId(goalId) /*, userId: userId */ }); // Add userId check here

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Savings goal not found or not owned by user' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Savings goal deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting savings goal ${goalId}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to delete savings goal', error: errorMessage }, { status: 500 });
  }
}
