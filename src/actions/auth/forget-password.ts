"use server";

import { prismaClient } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { ForgetPasswordFormData } from "@/validation/forget-password";
import * as crypto from "crypto";

export async function actionForgetPassword({ email }: ForgetPasswordFormData) {
  if (!email) {
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

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpires = Date.now() + 60 * 60 * 10;

  const verificationToken = await prismaClient.verificationToken.create({
    data: {
      token: passwordResetToken,
      tokenExpiry: new Date(passwordResetExpires),
      userId: user.id,
      identifier: "reset-password",
    },
  });

  if (!verificationToken)
    throw new Error("Ops, ocorreu um erro na criação do token!");

  const url = process.env.NEXTAUTH_URL + "/reset-password/" + resetToken;

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Recuperação de Senha",
    html: url,
  });
}
