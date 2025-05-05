import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import { compare } from 'bcrypt';
import { MongoClient, ObjectId } from 'mongodb';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const client: MongoClient = await clientPromise;
        const db = client.db(); // Use default db from connection string
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          console.log('No user found with email:', credentials.email);
          return null;
        }

        // Check if user has a password (might be OAuth user)
        if (!user.password) {
             console.log('User found but has no password (likely OAuth user)');
             return null;
        }


        const isValidPassword = await compare(credentials.password, user.password);

        if (!isValidPassword) {
          console.log('Password mismatch for user:', credentials.email);
          return null;
        }

         console.log('Login successful for:', user.email);
        // Return user object required by NextAuth, ensuring it has an 'id'
        return {
          id: user._id.toString(), // Convert ObjectId to string
          name: user.name,
          email: user.email,
          // Add other user properties if needed
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
     // Include user id in the JWT session token
     async jwt({ token, user }) {
       if (user) {
         token.id = user.id;
       }
       return token;
     },
     // Include user id in the session object
     async session({ session, token }) {
       if (session.user) {
          // Ensure id is assigned correctly. Next-auth might infer type incorrectly here.
          (session.user as any).id = token.id as string;
       }
       return session;
     },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // Redirect users to /login if not authenticated
    // error: '/auth/error', // Optional: Custom error page
    // newUser: '/get-started' // Optional: Redirect new users (e.g., after OAuth signup)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
