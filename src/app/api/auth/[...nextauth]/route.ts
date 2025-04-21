
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import argon2 from "argon2";
import { db } from "@/utils/db";

export const authOptions: NextAuthOptions = { 
  debug: true,
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;

        const isValid = await argon2.verify(user.password, credentials.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      const user = session.user;

      if (token && user) {
        user.id = typeof token.id === 'string' ? token.id : '';
        user.name = token.name;
        user.email = typeof token.email === 'string' ? token.email : '';
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.username;
        token.email = user.email;
      }
      return token;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
