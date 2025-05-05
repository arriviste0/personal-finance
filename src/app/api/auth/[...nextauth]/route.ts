import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { MongoClient, ObjectId } from 'mongodb';

// Define the structure of the user object returned by the authorize callback
interface User {
  id: string; // Use string for ObjectId representation
  name?: string | null;
  email?: string | null;
  image?: string | null;
}


export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
       async authorize(credentials): Promise<User | null> {
         if (!credentials?.email || !credentials.password) {
           throw new Error('Please provide email and password');
         }

        const client: MongoClient = await clientPromise;
        const db = client.db(); // Use default db from connection string
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          console.log("User not found with email:", credentials.email);
           throw new Error('No user found with this email.');
        }

         // Log found user for debugging (remove sensitive data in production)
         // console.log("User found:", { id: user._id, email: user.email });

        const isValidPassword = await compare(credentials.password, user.password);

        if (!isValidPassword) {
           console.log("Invalid password attempt for email:", credentials.email);
           throw new Error('Incorrect password.');
        }

         console.log("Authentication successful for:", user.email);

        // Return the user object in the expected format
         return {
           id: user._id.toString(), // Convert ObjectId to string
           name: user.name,
           email: user.email,
           image: user.image, // Include image if available
         };
       }
    })
  ],
  session: {
    strategy: 'jwt' as const, // Use JWT strategy
  },
  callbacks: {
     async jwt({ token, user }: { token: any, user?: User | any }) {
       // console.log("JWT Callback - Token:", token, "User:", user);
       // Persist the user id to the token right after signin
       if (user) {
         token.id = user.id;
         // Add other user properties if needed, e.g., token.name = user.name
       }
       return token;
     },
     async session({ session, token }: { session: any, token: any }) {
       // console.log("Session Callback - Session:", session, "Token:", token);
       // Send properties to the client, like an access_token and user id from the token.
       if (token?.id && session?.user) {
         session.user.id = token.id as string;
       }
       // console.log("Modified Session:", session);
       return session;
     }
  },
  pages: {
    signIn: '/login', // Redirect users to custom login page
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for email/passwordless sign in)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out to disable)
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for JWT signing
  debug: process.env.NODE_ENV === 'development', // Enable debug messages in development
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
