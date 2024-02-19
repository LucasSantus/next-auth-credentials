import { getAccountByUserIdServer } from "@/actions/get/get-account-by-user-id";
import { Framing } from "@/components/framer-motion/framing";
import { Separator } from "@/components/ui/separator";
import { TRANSITION_DURATION } from "@/constants/globals";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { SettingsSidebar } from "./_components/settings-sidebar";
import { sidebarItems } from "./_constants/sidebar-items";

import { Header } from "@/components/layout/header";
import { ACCOUNT_NOT_FOUND, USER_NOT_FOUND } from "@/constants/form";
import { authOptions } from "@/lib/auth";
import { Account } from "@prisma/client";
import { getServerSession } from "next-auth";
import { headerItems } from "./_constants/header-items";

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
    <div className="space-y-4">
      <Header session={session} items={headerItems} />

      <div className="container max-w-screen-2xl space-y-4">
        <Framing className="space-y-4" {...bounceHorizontalAnimation({})}>
          <div className="-mx-4">
            <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
            <p className="text-muted-foreground">
              Gerencie as configurações da sua conta.
            </p>
          </div>
          <Separator className="-mx-4" />
        </Framing>
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingsSidebar items={sidebarItems} />
          </aside>
          <Framing
            className="flex-1 lg:max-w-2xl"
            {...bounceHorizontalAnimation({
              delay: sidebarItems.length + TRANSITION_DURATION * 0.3 + 1,
            })}
          >
            {children}
          </Framing>
        </div>
      </div>
    </div>
  );
}
