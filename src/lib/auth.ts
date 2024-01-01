import { authSignInServer } from "@/actions/auth/sign-in";
import { ERROR_VALUES_VALIDATION } from "@/constants/form";
import { env } from "@/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "./prisma";

type UserSessionType = {
  id: string;
  name: string;
  email: string;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error(ERROR_VALUES_VALIDATION);
        }

        const userLogged = await authSignInServer({
          email: credentials.email,
          password: credentials.password,
        });

        return userLogged;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && !!session) {
        token.name = session?.name;
      }

      if (user)
        return {
          ...token,
          user,
        };

      return token;
    },
    async session({ session, user, token, newSession, trigger }) {
      if (token) {
        const { user: userToken } = token as {
          user: {
            id: string;
          };
        };

        session.user = { ...session.user, id: userToken.id } as UserSessionType;
      } else if (trigger === "update" && !!newSession) {
        session.user.name = newSession.name;
      } else {
        session.user = {
          ...session.user,
          id: user.id,
        } as UserSessionType;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
};
