"use server";

import { prismaClient } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { NewUserFormData } from "./form";

export async function createUser(values: NewUserFormData) {
  const { name, email, password } = values;

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

  return user;
}
