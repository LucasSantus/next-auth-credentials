import { prismaClient } from "@/lib/prisma";
import * as crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token)
    throw new Error(
      "Insira o parâmetro [verificationToken] para fazer a busca dos dados",
    );

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

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

  if (!user) throw new Error("Usuário do token não encontrado!");

  return NextResponse.json({
    ok: true,
    user,
    verificationToken,
  });
}
