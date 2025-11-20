import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthUser {
  id: string;
  email: string;
  royalId: string;
  phoneNumber: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<AuthUser | null> {
        const { email, password } = credentials as LoginCredentials;

        if (!email || !password) throw new Error("Email and password are required");

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Invalid credentials");

        return {
          id: user.id,
          email: user.email,
          royalId: user.royalId,
          phoneNumber: user.phoneNumber,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AuthUser; 
        token.id = u.id;
        token.email = u.email;
        token.royalId = u.royalId;
        token.phoneNumber = u.phoneNumber;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        royalId: token.royalId as string,
        phoneNumber: token.phoneNumber as string,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
