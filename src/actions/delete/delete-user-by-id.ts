"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";

export async function deleteUserByIdServer(id: string) {
  if (!id) throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const emailExists = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });

  if (!emailExists) throw new Error(messages.account.USER_NOT_FOUND);

  await prismaClient.user.delete({
    where: {
      id,
    },
  });
}
