import { NextResponse, type NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { InvestmentSchema } from '@/lib/db-schemas';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface RouteParams {
  params: {
    investmentId: string;
  };
}

/**
 * PUT /api/investments/[investmentId]
 * Updates a specific investment by its ID.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { investmentId } = await params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(investmentId)) {
    return NextResponse.json({ message: 'Invalid investment ID' }, { status: 400 });
  }

  try {
    const body = await request.json() as Partial<Omit<InvestmentSchema, '_id' | 'userId' | 'createdAt'>>;
    const updateData = { ...body, updatedAt: new Date() };

    const client = await clientPromise;
    const db = client.db();
    const investmentsCollection = db.collection<InvestmentSchema>('investments');

    const result = await investmentsCollection.findOneAndUpdate(
      { _id: new ObjectId(investmentId), userId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ message: 'Investment not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(`Error updating investment ${investmentId}:`, error);
    return NextResponse.json({ message: 'Failed to update investment' }, { status: 500 });
  }
}

/**
 * DELETE /api/investments/[investmentId]
 * Deletes a specific investment by its ID.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { investmentId } = params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(investmentId)) {
    return NextResponse.json({ message: 'Invalid investment ID' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const investmentsCollection = db.collection<InvestmentSchema>('investments');

    const result = await investmentsCollection.deleteOne({ _id: new ObjectId(investmentId), userId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Investment not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Investment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting investment ${investmentId}:`, error);
    return NextResponse.json({ message: 'Failed to delete investment' }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { investmentId } = await params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  if (!ObjectId.isValid(investmentId)) {
    return NextResponse.json({ message: 'Invalid investment ID' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const investmentsCollection = db.collection<InvestmentSchema>('investments');

    const result = await investmentsCollection.findOne({ _id: new ObjectId(investmentId), userId });

    if (!result) {
      return NextResponse.json({ message: 'Investment not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(`Error retrieving investment ${investmentId}:`, error);
    return NextResponse.json({ message: 'Failed to retrieve investment' }, { status: 500 });
  }
}
