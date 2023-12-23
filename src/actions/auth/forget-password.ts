"use server";

import {
  EMAIL_DONT_REGISTERED_ON_SYSTEM,
  ERROR_VALUES_VALIDATION,
} from "@/constants/form";
import { enviromentVariable } from "@/env";
import { prismaClient } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import generateHash from "@/utils/hash";
import { ForgetPasswordFormData } from "@/validation/auth/forget-password";

export async function authActionForgetPassword({
  email,
}: ForgetPasswordFormData) {
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
  const resetToken = generateHash.randomBytes();
  const passwordResetToken = generateHash.createHash(resetToken);

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

  const url = enviromentVariable.NEXTAUTH_URL + "/reset-password/" + resetToken;

  resend.emails.send({
    from: enviromentVariable.RESEND_TO_EMAIL,
    to: email,
    subject: "Recuperação de Senha",
    html: url,
  });
}
