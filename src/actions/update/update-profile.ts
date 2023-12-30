"use server";

import {
  EMAIL_DONT_REGISTERED_ON_SYSTEM,
  ERROR_VALUES_VALIDATION,
} from "@/constants/form";
import { prismaClient } from "@/lib/prisma";
import { ProfileFormData } from "@/validation/settings/profile";

export async function updateProfileServer({ name, email }: ProfileFormData) {
  if (!name || !email) {
    throw new Error(ERROR_VALUES_VALIDATION);
  }

  const emailExists = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!emailExists) throw new Error(EMAIL_DONT_REGISTERED_ON_SYSTEM);

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
