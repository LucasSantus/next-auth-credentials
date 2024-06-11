"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { SignInFormData } from "@/validation/auth/sign-in";
import * as bcrypt from "bcrypt";

export async function authSignInServer({ email, password }: SignInFormData) {
  if (!email || !password)
    throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error(messages.account.USER_NOT_FOUND);

  if (user.deletedAt) throw new Error("Este usuário foi deletado!");

  const account = await prismaClient.account.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!account || !account.id)
    throw new Error(messages.account.ACCOUNT_NOT_FOUND);

  if (account.provider !== "credentials" || !user.hashedPassword)
    throw new Error(
      "Sua conta está vinculada a um método de autenticação diferente!",
    );

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) throw new Error("A Senha informada está incorreta!");

  return user;
}
