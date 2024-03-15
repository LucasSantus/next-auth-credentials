"use server";

import { PROJECT_NAME } from "@/constants/config";
import { messages } from "@/constants/globals";

import EmailResetPassword from "@/emails/reset-password";
import { env } from "@/env";
import { prismaClient } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import generateHash from "@/utils/hash";
import { ForgetPasswordFormData } from "@/validation/auth/forget-password";

export async function authForgetPasswordServer({
  email,
}: ForgetPasswordFormData) {
  if (!email) throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.name)
    throw new Error(messages.account.EMAIL_DONT_REGISTERED_ON_SYSTEM);

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

  const url = env.NEXTAUTH_URL + "/reset-password/" + resetToken;

  resend.emails.send({
    from: env.RESEND_TO_EMAIL,
    to: email,
    subject: "Recuperação de Senha",
    react: EmailResetPassword({
      applicationName: PROJECT_NAME,
      username: user.name,
      url,
    }),
  });
}
