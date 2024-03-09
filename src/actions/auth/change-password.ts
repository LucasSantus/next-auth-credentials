"use server";

import { messages } from "@/constants/globals";
import { prismaClient } from "@/lib/prisma";
import { ChangePasswordFormData } from "@/validation/auth/change-password";
import * as bcrypt from "bcrypt";

export async function authChangePasswordServer({
  email,
  password,
  oldPassword,
}: ChangePasswordFormData) {
  if (!email || !password)
    throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.hashedPassword)
    throw new Error(messages.account.USER_NOT_FOUND);

  const passwordMatch = await bcrypt.compare(oldPassword, user.hashedPassword);

  if (!passwordMatch) throw new Error("Sua senha antiga está incorreta!");

  const hashedPassword = await bcrypt.hash(password, 10);

  await prismaClient.user.update({
    where: { email },
    data: { hashedPassword },
  });

  return user;
}
