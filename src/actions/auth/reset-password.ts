"use server";

import {
  EMAIL_DONT_REGISTERED_ON_SYSTEM,
  ERROR_VALUES_VALIDATION,
} from "@/constants/form";
import { prismaClient } from "@/lib/prisma";
import { ResetPasswordFormData } from "@/validation/reset-password";
import * as bcrypt from "bcrypt";

export async function actionResetPassword({
  email,
  password,
}: ResetPasswordFormData) {
  if (!email || !password) throw new Error(ERROR_VALUES_VALIDATION);

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error(EMAIL_DONT_REGISTERED_ON_SYSTEM);

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
