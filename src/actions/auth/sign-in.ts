"use server";

import { messages } from "@/constants/globals";
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

  if (!user || !user?.hashedPassword)
    throw new Error(messages.account.USER_NOT_FOUND);

  if (user.deletedAt) throw new Error("Este usuário foi deletado!");

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) throw new Error("Senha incorreta!");

  return user;
}
