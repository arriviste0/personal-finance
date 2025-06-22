
import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId, type MongoClient } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { SavingsGoalSchema, UserSchema } from '@/lib/db-schemas';

interface RouteParams {
  params: {
    goalId: string;
  };
}

/**
 * POST /api/savings-goals/[goalId]/funds
 * Deposits or withdraws funds from a savings goal.
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { goalId } = params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(goalId)) {
    return NextResponse.json({ message: 'Invalid goal ID' }, { status: 400 });
  }

  let mongoClient: MongoClient | undefined;

  try {
    const { amount, type } = await request.json() as { amount: number; type: 'deposit' | 'withdraw' };

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }
    if (type !== 'deposit' && type !== 'withdraw') {
      return NextResponse.json({ message: 'Invalid transaction type' }, { status: 400 });
    }

    mongoClient = await clientPromise;
    const db = mongoClient.db();
    const usersCollection = db.collection<UserSchema>('users');
    const goalsCollection = db.collection<SavingsGoalSchema>('savingsGoals');
    
    const dbSession = mongoClient.startSession();

    let result;
    await dbSession.withTransaction(async () => {
      const user = await usersCollection.findOne({ _id: userId }, { session: dbSession });
      const goal = await goalsCollection.findOne({ _id: new ObjectId(goalId), userId: userId }, { session: dbSession });

      if (!user) {
        throw new Error('User not found');
      }
      if (!goal) {
        throw new Error('Goal not found');
      }

      if (type === 'deposit') {
        if (user.walletBalance < amount) {
          throw new Error('Insufficient wallet balance');
        }
        await usersCollection.updateOne({ _id: userId }, { $inc: { walletBalance: -amount } }, { session: dbSession });
        result = await goalsCollection.findOneAndUpdate(
          { _id: new ObjectId(goalId) },
          { $inc: { currentAmount: amount } },
          { session: dbSession, returnDocument: 'after' }
        );
      } else { // Withdraw
        if (goal.currentAmount < amount) {
          throw new Error('Insufficient funds in goal');
        }
        await usersCollection.updateOne({ _id: userId }, { $inc: { walletBalance: amount } }, { session: dbSession });
        result = await goalsCollection.findOneAndUpdate(
          { _id: new ObjectId(goalId) },
          { $inc: { currentAmount: -amount } },
          { session: dbSession, returnDocument: 'after' }
        );
      }
    });

    await dbSession.endSession();

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Transaction failed';
    return NextResponse.json({ message }, { status: 500 });
  }
}
