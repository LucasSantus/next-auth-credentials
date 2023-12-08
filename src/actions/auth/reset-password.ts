"use server";

import { prismaClient } from "@/lib/prisma";
import { ResetPasswordFormData } from "@/validation/reset-password";
import * as bcrypt from "bcrypt";

export async function actionResetPassword({
  email,
  password,
}: ResetPasswordFormData) {
  if (!email || !password) {
    throw new Error(
      "Ops, parece que algo deu errado. Por favor, verifique os dados fornecidos e tente novamente.",
    );
  }

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Desculpe, este e-mail não está cadastrado no sistema.");
  }

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
