
import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import type { MongoClient } from 'mongodb';

// Define the structure of the user object returned by the authorize callback
interface UserAuthResponse {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}


export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
       async authorize(credentials, req): Promise<UserAuthResponse | null> {
         // console.log("[NextAuth] Authorize attempt for email:", credentials?.email);
         if (!credentials?.email || !credentials.password) {
           console.error("[NextAuth] Missing email or password in credentials.");
           throw new Error('Please provide email and password.');
         }

        const client: MongoClient = await clientPromise;
        const db = client.db(); 
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          console.warn("[NextAuth] User not found with email:", credentials.email);
           throw new Error('No user found with this email.');
        }
        
        // console.log("[NextAuth] User found in DB:", { id: user._id, email: user.email });

        const isValidPassword = await compare(credentials.password, user.password);

        if (!isValidPassword) {
           console.warn("[NextAuth] Invalid password attempt for email:", credentials.email);
           throw new Error('Incorrect password.');
        }

         // console.log("[NextAuth] Authentication successful for:", user.email);

         return {
           id: user._id.toString(), 
           name: user.name,
           email: user.email,
           image: user.image, 
         };
       }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
     async jwt({ token, user }) {
       // console.log("[NextAuth] JWT Callback - Input Token:", token, "Input User:", user);
       if (user) {
         token.id = user.id; // Add user ID to the JWT token
       }
       // console.log("[NextAuth] JWT Callback - Output Token:", token);
       return token;
     },
     async session({ session, token }) {
       // console.log("[NextAuth] Session Callback - Input Session:", session, "Input Token:", token);
       if (token?.id && session?.user) {
         session.user.id = token.id as string; // Add user ID to the session object
       }
       // console.log("[NextAuth] Session Callback - Output Session:", session);
       return session;
     }
  },
  pages: {
    signIn: '/login', // Redirect users to /login if they are not authenticated
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
