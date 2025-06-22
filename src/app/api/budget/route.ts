
import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { BudgetSchema, BudgetItemSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { format } from 'date-fns';

/**
 * GET /api/budget
 * Fetches the budget for a given month for the authenticated user.
 * Query Parameters:
 *  - month (string): The month to fetch in "YYYY-MM" format.
 */
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  const searchParams = request.nextUrl.searchParams;
  const monthYear = searchParams.get('month') || format(new Date(), 'yyyy-MM');

  try {
    const client = await clientPromise;
    const db = client.db();
    const budgetsCollection = db.collection<BudgetSchema>('budgets');

    let budget = await budgetsCollection.findOne({ userId, monthYear });

    if (!budget) {
      // If no budget exists for the month, create a default one
      const newBudget: Omit<BudgetSchema, '_id'> = {
        userId,
        monthYear,
        budgetItems: [
          { _id: new ObjectId(), category: "Food & Groceries", spent: 0, budget: 600, color: "hsl(var(--chart-1))" },
          { _id: new ObjectId(), category: "Transportation", spent: 0, budget: 200, color: "hsl(var(--chart-2))" },
          { _id: new ObjectId(), category: "Entertainment", spent: 0, budget: 300, color: "hsl(var(--chart-3))" },
          { _id: new ObjectId(), category: "Utilities", spent: 0, budget: 200, color: "hsl(var(--chart-4))" },
          { _id: new ObjectId(), category: "Shopping", spent: 0, budget: 400, color: "hsl(var(--chart-5))" },
          { _id: new ObjectId(), category: "Rent/Mortgage", spent: 0, budget: 1200, color: "hsl(var(--muted))" },
        ],
        totalBudget: 2900,
        totalSpent: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await budgetsCollection.insertOne(newBudget as BudgetSchema);
      budget = { ...newBudget, _id: result.insertedId };
    }

    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.error('Error fetching budget:', error);
    return NextResponse.json({ message: 'Failed to fetch budget' }, { status: 500 });
  }
}


/**
 * POST /api/budget
 * Creates or updates a budget for the authenticated user.
 */
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = new ObjectId(session.user.id);

    try {
        const body = (await request.json()) as Omit<BudgetSchema, '_id' | 'userId' | 'createdAt'>;
        const { monthYear, budgetItems } = body;

        if (!monthYear || !budgetItems) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const totalBudget = budgetItems.reduce((sum, item) => sum + item.budget, 0);
        const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);

        const client = await clientPromise;
        const db = client.db();
        const budgetsCollection = db.collection<BudgetSchema>('budgets');

        const result = await budgetsCollection.findOneAndUpdate(
            { userId, monthYear },
            {
                $set: {
                    budgetItems: budgetItems.map(item => ({...item, _id: item._id ? new ObjectId(item._id) : new ObjectId()})),
                    totalBudget,
                    totalSpent,
                    updatedAt: new Date()
                },
                $setOnInsert: {
                    userId,
                    monthYear,
                    createdAt: new Date()
                }
            },
            { upsert: true, returnDocument: 'after' }
        );
        
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error saving budget:', error);
        return NextResponse.json({ message: 'Failed to save budget' }, { status: 500 });
    }
}
