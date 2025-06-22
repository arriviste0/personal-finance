
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId, type MongoClient } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { UserSchema } from '@/lib/db-schemas';

/**
 * GET /api/user
 * Fetches the authenticated user's details.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(session.user.id);

  try {
    const client: MongoClient = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection<UserSchema>('users');

    const user = await usersCollection.findOne(
      { _id: userId },
      // Projection to only return necessary fields
      { projection: { password: 0, emailVerified: 0 } } 
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ message: 'Failed to fetch user data' }, { status: 500 });
  }
}
