"use server";

import { messages } from "@/constants/globals";
import { prismaClient } from "@/lib/prisma";
import { ResetPasswordFormData } from "@/validation/auth/reset-password";
import * as bcrypt from "bcrypt";

export async function authResetPasswordServer({
  email,
  password,
}: ResetPasswordFormData) {
  if (!email || !password)
    throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error(messages.account.EMAIL_DONT_REGISTERED_ON_SYSTEM);

  const hashedPassword = await bcrypt.hash(password, 10);

  await prismaClient.user.update({
    where: { email },
    data: { hashedPassword },
  });

  await prismaClient.verificationToken.deleteMany({
    where: {
      user: {
        email,
      },
    },
  });

  return user;
}
