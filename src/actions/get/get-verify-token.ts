"use server";

import { messages } from "@/constants/globals";
import { prismaClient } from "@/lib/prisma";
import generateHash from "@/utils/hash";
import { User, VerificationToken } from "@prisma/client";

export interface VerifyTokenResponse {
  ok: boolean;
  user: User;
  verificationToken: VerificationToken;
}

export async function getVerifyTokenServer(
  token: string,
): Promise<VerifyTokenResponse> {
  if (!token) throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const hashedToken = await generateHash.createHash(token);

  const verificationToken = await prismaClient.verificationToken.findFirst({
    where: {
      token: hashedToken,
      tokenExpiry: { lt: new Date() },
    },
  });

  if (!verificationToken) throw new Error("Token inválido ou já expirado!");

  const user = await prismaClient.user.findFirst({
    where: {
      id: verificationToken.userId,
    },
  });

  if (!user) throw new Error(messages.account.USER_NOT_FOUND);

  return {
    ok: true,
    user,
    verificationToken,
  };
}
