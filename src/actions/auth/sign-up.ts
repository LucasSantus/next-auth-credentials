"use server";

import { prismaClient } from "@/lib/prisma";
import { SignUpFormData } from "@/validation/sign-up";
import * as bcrypt from "bcrypt";

export async function actionSignUp({ name, email, password }: SignUpFormData) {
  if (!name || !email || !password) {
    throw new Error(
      "Ops, parece que algo deu errado. Por favor, verifique os dados fornecidos e tente novamente.",
    );
  }

  const exist = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    throw new Error("Desculpe, este e-mail já está cadastrado no sistema.");
  }

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
