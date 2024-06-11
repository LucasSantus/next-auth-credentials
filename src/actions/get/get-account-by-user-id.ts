"use server";

import { messages } from "@/constants/messages";
import { prismaClient } from "@/lib/prisma";
import { Account } from "@prisma/client";

export async function getAccountByUserIdServer(
  userId: string,
): Promise<Account> {
  if (!userId) throw new Error(messages.globals.ERROR_VALUES_VALIDATION);

  const account = await prismaClient.account.findFirst({
    where: {
      userId,
    },
  });

  if (!account) throw new Error(messages.account.ACCOUNT_NOT_FOUND);

  return account;
}
