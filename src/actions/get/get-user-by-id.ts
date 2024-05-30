"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getUserByIdServer(id: string): Promise<User> {
  if (!id) throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) throw new Error(messages.account.USER_NOT_FOUND);

  return user;
}
