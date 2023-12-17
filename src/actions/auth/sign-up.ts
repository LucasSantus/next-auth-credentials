"use server";

import {
  EMAIL_REGISTERED_ON_SYSTEM,
  ERROR_VALUES_VALIDATION,
} from "@/constants/form";
import { prismaClient } from "@/lib/prisma";
import { SignUpFormData } from "@/validation/auth/sign-up";
import * as bcrypt from "bcrypt";

export async function actionSignUp({ name, email, password }: SignUpFormData) {
  if (!name || !email || !password) {
    throw new Error(ERROR_VALUES_VALIDATION);
  }

  const emailExists = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) throw new Error(EMAIL_REGISTERED_ON_SYSTEM);

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
      provider: "Credentials",
      type: "credentials",
      providerAccountId: crypto.randomUUID(),
      userId: user.id,
    },
  });
}
