import { PrismaAdapter } from "@auth/prisma-adapter";
import * as bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prismaClient } from "./prisma";

type UserSessionType = {
  id: string;
  name: string;
  email: string;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
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
          throw new Error("Usuário não encontrado!");
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
    async jwt({ token, user }) {
      if (user)
        return {
          ...token,
          user,
        };

      return token;
    },
    async session({ session, user: userSession, token }) {
      if (token) {
        const { user } = token as {
          user: {
            id: string;
          };
        };

        session.user = { ...session.user, id: user.id } as UserSessionType;
      } else {
        session.user = {
          ...session.user,
          id: userSession.id,
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
