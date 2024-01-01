import { getAccountByUserIdServer } from "@/actions/get/get-account-by-user-id";
import { Framing } from "@/components/framer-motion/framing";
import { Separator } from "@/components/ui/separator";
import { TRANSITION_DURATION } from "@/constants/globals";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { ReactNode } from "react";
import { SettingsSidebar } from "./_components/settings-sidebar";
import { sidebarNavItems } from "./nav-items";

import { ACCOUNT_NOT_FOUND, USER_NOT_FOUND } from "@/constants/form";
import { authOptions } from "@/lib/auth";
import { Account } from "@prisma/client";
import { getServerSession } from "next-auth";

export interface SettingsSidebarNavType {
  title: string;
  href: string;
  icon: ReactNode;
  provider: "all" | "credentials";
}

interface GlobalSettingsLayoutProps {
  children: React.ReactNode;
}

async function getAccount(userId: string): Promise<Account | null> {
  try {
    return await getAccountByUserIdServer(userId);
  } catch (error) {
    return null;
  }
}

export default async function GlobalSettingsLayout({
  children,
}: GlobalSettingsLayoutProps) {
  const session = await getServerSession(authOptions);

  const isAuthenticated = !!session && !!session.user;

  if (!isAuthenticated || !session.user.email)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-destructive">{USER_NOT_FOUND}</span>
      </div>
    );

  const account = getAccount(session.user.id);

  if (!account)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-destructive">{ACCOUNT_NOT_FOUND}</span>
      </div>
    );

  return (
    <div className="space-y-6 p-10 pb-16">
      <Framing className="grid gap-1" {...bounceHorizontalAnimation({})}>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua conta.
          </p>
        </div>
        <Separator className="my-6" />
      </Framing>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SettingsSidebar items={sidebarNavItems} />
        </aside>
        <Framing
          className="flex-1 lg:max-w-2xl"
          {...bounceHorizontalAnimation({
            delay: sidebarNavItems.length + TRANSITION_DURATION * 0.3 + 1,
          })}
        >
          {children}
        </Framing>
      </div>
    </div>
  );
}
