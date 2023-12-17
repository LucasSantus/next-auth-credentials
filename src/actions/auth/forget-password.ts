"use server";

import {
  EMAIL_DONT_REGISTERED_ON_SYSTEM,
  ERROR_VALUES_VALIDATION,
} from "@/constants/form";
import { prismaClient } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { ForgetPasswordFormData } from "@/validation/auth/forget-password";
import * as crypto from "crypto";

export async function actionForgetPassword({ email }: ForgetPasswordFormData) {
  if (!email) throw new Error(ERROR_VALUES_VALIDATION);

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error(EMAIL_DONT_REGISTERED_ON_SYSTEM);

  await prismaClient.verificationToken.deleteMany({
    where: {
      user: {
        email,
      },
    },
  });

  const passwordResetExpires = Date.now() + 60 * 60 * 10;
  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

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
