"use server";
import { prismaClient } from "@/lib/prisma";
import { ResetPasswordFormData } from "@/validation/reset-password";

export async function actionResetPassword({ email }: ResetPasswordFormData) {
  if (!email) {
    throw new Error(
      "Ops, parece que algo deu errado. Por favor, verifique os dados fornecidos e tente novamente.",
    );
  }

  const emailExists = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!emailExists) {
    throw new Error("Desculpe, este e-mail não está cadastrado no sistema.");
  }
}
