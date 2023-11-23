"use server";
import { prismaClient } from "@/lib/prisma";
import { SignUpFormData } from "@/validation/sign-up";
import * as bcrypt from "bcrypt";

export async function newUser({ name, email, password }: SignUpFormData) {
  if (!name || !email || !password) {
    throw new Error("Missing Fields");
  }

  const exist = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  await prismaClient.account.create({
    data: {
      provider: "Credentials",
      type: "credentials",
      providerAccountId: crypto.randomUUID(),
      userId: user.id,
    },
  });

  return user;
}
