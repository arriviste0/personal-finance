import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique ID. */
      id: string;
    } & DefaultSession["user"]; // Keep existing fields like name, email, image
  }

   /** The user object returned by the `authorize` callback and stored in the database. */
   interface User extends DefaultUser {
     // Add your custom fields here if needed, otherwise DefaultUser is often sufficient
     // when using an adapter, as it maps basic fields.
     // The adapter handles the `_id` to `id` conversion internally for the session.
   }
}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and stored inside the JWT */
  interface JWT {
    /** User ID */
    id: string;
    // You can add other fields to the token here if needed
  }
}
