"use server";

import { ERROR_VALUES_VALIDATION, USER_NOT_FOUND } from "@/constants/form";
import { prismaClient } from "@/lib/prisma";
import generateHash from "@/utils/hash";
import { User, VerificationToken } from "@prisma/client";

export interface VerifyTokenResponse {
  ok: boolean;
  user: User;
  verificationToken: VerificationToken;
}

export async function getActionVerifyToken(
  token: string,
): Promise<VerifyTokenResponse> {
  if (!token) {
    throw new Error(ERROR_VALUES_VALIDATION);
  }

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

  if (!user) throw new Error(USER_NOT_FOUND);

  return {
    ok: true,
    user,
    verificationToken,
  };
}
