"use server";

import { ERROR_VALUES_VALIDATION, USER_NOT_FOUND } from "@/constants/form";
import { prismaClient } from "@/lib/prisma";

export async function deleteActionUserById(id: string) {
  if (!id) throw new Error(ERROR_VALUES_VALIDATION);

  const emailExists = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });

  if (!emailExists) throw new Error(USER_NOT_FOUND);

  await prismaClient.user.delete({
    where: {
      id,
    },
  });
}
