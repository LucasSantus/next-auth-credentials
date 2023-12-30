"use server";

import { ACCOUNT_NOT_FOUND, ERROR_VALUES_VALIDATION } from "@/constants/form";
import { prismaClient } from "@/lib/prisma";
import { Account } from "@prisma/client";

export async function getAccountByUserIdServer(
  userId: string,
): Promise<Account> {
  if (!userId) throw new Error(ERROR_VALUES_VALIDATION);

  const account = await prismaClient.account.findFirst({
    where: {
      userId,
    },
  });

  if (!account) throw new Error(ACCOUNT_NOT_FOUND);

  return account;
}
