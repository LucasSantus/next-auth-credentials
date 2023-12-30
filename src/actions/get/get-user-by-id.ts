"use server";

import { ERROR_VALUES_VALIDATION, USER_NOT_FOUND } from "@/constants/form";
import { prismaClient } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getUserByIdServer(id: string): Promise<User> {
  if (!id) throw new Error(ERROR_VALUES_VALIDATION);

  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) throw new Error(USER_NOT_FOUND);

  return user;
}
