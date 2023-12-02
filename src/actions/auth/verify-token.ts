"use server";

import { prismaClient } from "@/lib/prisma";
import * as crypto from "crypto";

export async function actionVerifyToken({ token }: { token: string }) {
  if (!token) {
    throw new Error(
      "Ops, parece que algo deu errado. Por favor, verifique os dados fornecidos e tente novamente.",
    );
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prismaClient.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: { gt: Date.now() },
    },
  });

  if (!user) {
    throw new Error("Token inválido ou já expirado!");
  }
}
