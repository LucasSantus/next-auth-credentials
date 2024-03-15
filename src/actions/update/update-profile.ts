"use server";

import { messages } from "@/constants/globals";
import { prismaClient } from "@/lib/prisma";
import { ProfileFormData } from "@/validation/settings/profile";

export async function updateProfileServer({ name, email }: ProfileFormData) {
  if (!name || !email)
    throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const emailExists = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!emailExists)
    throw new Error(messages.account.EMAIL_DONT_REGISTERED_ON_SYSTEM);

  await prismaClient.user.update({
    where: {
      email,
    },
    data: {
      name,
      email,
    },
  });
}
