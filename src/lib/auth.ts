import { USER_NOT_FOUND } from "@/constants/form";
import { PrismaAdapter } from "@auth/prisma-adapter";
import * as bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
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
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Insira o e-mail e senha!");
        }

        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error(USER_NOT_FOUND);
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!passwordMatch) {
          throw new Error("Senha incorreta!");
        }

        return user;
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
