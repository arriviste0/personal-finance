
import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { SavingsGoalSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
// To get the authenticated user's session:
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * GET /api/savings-goals
 * Fetches all savings goals for the authenticated user.
 * Query Parameters:
 *  - userId (string): The ID of the user whose goals to fetch (in a real app, this comes from session).
 */
export async function GET(request: NextRequest) {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }
  // const userId = session.user.id;

  // For demo purposes, let's assume userId is passed as a query param or use a default.
  // In a real app, you'd get it from the session.
  const searchParams = request.nextUrl.searchParams;
  const userIdParam = searchParams.get('userId');

  if (!userIdParam) {
      return NextResponse.json({ message: 'userId query parameter is required for this demo.' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // Use your default database name or specify one
    const savingsGoalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');

    const goals = await savingsGoalsCollection.find({ userId: new ObjectId(userIdParam) }).toArray();

    return NextResponse.json({ message: 'Savings goals fetched successfully', data: goals }, { status: 200 });
  } catch (error) {
    console.error('Error fetching savings goals:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to fetch savings goals', error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/savings-goals
 * Creates a new savings goal for the authenticated user.
 * Request Body: Omit<SavingsGoalSchema, '_id' | 'userId' | 'createdAt' | 'updatedAt' | 'currentAmount' | 'isComplete'>
 */
export async function POST(request: NextRequest) {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }
  // const userId = new ObjectId(session.user.id);

  try {
    const body = await request.json() as Omit<SavingsGoalSchema, '_id' | 'createdAt' | 'updatedAt' | 'currentAmount' | 'isComplete'>;

    // Basic validation (more robust validation should be added)
    if (!body.name || !body.targetAmount || body.targetAmount <= 0) {
      return NextResponse.json({ message: 'Goal name and a positive target amount are required.' }, { status: 400 });
    }
    // For demo purposes, let's assume userId is passed in the body or use a default.
    // In a real app, you'd get it from the session and not expect it in the body.
    if (!body.userId) {
        return NextResponse.json({ message: 'userId is required in the request body for this demo.' }, { status: 400 });
    }
    const userId = new ObjectId(body.userId as unknown as string);


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

    return NextResponse.json({ message: 'Savings goal created successfully', data: { ...newGoal, _id: result.insertedId } }, { status: 201 });
  } catch (error) {
    console.error('Error creating savings goal:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to create savings goal', error: errorMessage }, { status: 500 });
  }
}
