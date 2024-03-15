"use server";

import { messages } from "@/constants/globals";
import { prismaClient } from "@/lib/prisma";
import { SignUpFormData } from "@/validation/auth/sign-up";
import * as bcrypt from "bcrypt";

export async function authSignUpServer({
  name,
  email,
  password,
}: SignUpFormData) {
  if (!name || !email || !password)
    throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const emailExists = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) throw new Error(messages.account.EMAIL_REGISTERED_ON_SYSTEM);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  await prismaClient.account.create({
    data: {
      provider: "credentials",
      type: "credentials",
      providerAccountId: crypto.randomUUID(),
      userId: user.id,
    },
  });
}
