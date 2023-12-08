import { prismaClient } from "@/lib/prisma";
import * as crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  console.log("1", token);

  if (!token)
    throw new Error(
      "Insira o parâmetro [verificationToken] para fazer a busca dos dados",
    );

  console.log("2");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  console.log("3");

  const verificationToken = await prismaClient.verificationToken.findFirst({
    where: {
      token: hashedToken,
      tokenExpiry: { lt: new Date() },
    },
  });

  console.log("4", verificationToken);

  if (!verificationToken) throw new Error("Token inválido ou já expirado!");

  console.log("5");
  const user = await prismaClient.user.findFirst({
    where: {
      id: verificationToken.userId,
    },
  });

  console.log("6");

  if (!user) throw new Error("Usuário do token não encontrado!");

  console.log("7");

  return NextResponse.json({
    user,
    verificationToken,
  });
}
