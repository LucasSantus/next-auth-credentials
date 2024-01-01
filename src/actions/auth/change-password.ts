"use server";

import { ERROR_VALUES_VALIDATION, USER_NOT_FOUND } from "@/constants/form";
import { prismaClient } from "@/lib/prisma";
import { ChangePasswordFormData } from "@/validation/auth/change-password";
import * as bcrypt from "bcrypt";

export async function authChangePasswordServer({
  email,
  password,
  oldPassword,
}: ChangePasswordFormData) {
  if (!email || !password) throw new Error(ERROR_VALUES_VALIDATION);

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.hashedPassword) throw new Error(USER_NOT_FOUND);

  const passwordMatch = await bcrypt.compare(oldPassword, user.hashedPassword);

  if (!passwordMatch) throw new Error("Sua senha antiga está incorreta!");

  const hashedPassword = await bcrypt.hash(password, 10);

  await prismaClient.user.update({
    where: { email },
    data: { hashedPassword },
  });

  return user;
}
