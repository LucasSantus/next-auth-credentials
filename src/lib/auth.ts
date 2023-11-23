import { PrismaAdapter } from "@auth/prisma-adapter";
import * as bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prismaClient } from "./prisma";

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
          throw new Error("Please enter an email and password!");
        }

        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback", { token, user });
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      const newUser = token as {
        user: {
          id: string;
        };
      };
      console.log(
        "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nKAAAARALEO",
        "session: ",
        session,
        "user: ",
        user,
        "token: ",
        token,
      );

      if (token) {
        session.user = { ...session.user, id: newUser.user.id } as {
          id: string;
          name: string;
          email: string;
        };
      } else {
        session.user = { ...session.user, id: user.id } as {
          id: string;
          name: string;
          email: string;
        };
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
