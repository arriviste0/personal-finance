import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import clientPromise from '@/lib/mongodb';
import { MongoClient } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
     if (password.length < 6) {
         return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 });
     }

    const client: MongoClient = await clientPromise;
    const db = client.db(); // Use default db from connection string
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 }); // 409 Conflict
    }

    const hashedPassword = await hash(password, 10);

    // Create new user document
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      emailVerified: null, // Standard field for adapters, initially null
      image: null, // Standard field for adapters, initially null
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: 'User created successfully', userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    // Type assertion for error object
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}
