"use server";

import { USER_NOT_FOUND } from "@/constants/form";
import { prismaClient } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getUserById(id: string): Promise<User> {
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) throw new Error(USER_NOT_FOUND);

  return user;
}
