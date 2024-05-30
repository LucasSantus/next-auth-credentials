import { getAccountByUserIdServer } from "@/actions/get/get-account-by-user-id";
import { Framing } from "@/components/framer-motion/framing";
import { TRANSITION_DURATION } from "@/constants/globals";
import { messages } from "@/constants/messages";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { SettingsSidebar } from "./_components/settings-sidebar";
import { sidebarItems } from "./_constants/sidebar-items";
import { Header } from "@/components/layout/header";
import { PageDescription } from "@/components/page-description";
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
        <span className="text-destructive">
          {messages.account.USER_NOT_FOUND}
        </span>
      </div>
    );

  const account = await getAccount(session.user.id);

  if (!account)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-destructive">
          {messages.account.ACCOUNT_NOT_FOUND}
        </span>
      </div>
    );

  return (
    <div className="space-y-4">
      <Header
        session={session}
        items={headerItems}
        shouldDisplaySidebar={false}
      />

      <div className="container space-y-4">
        <PageDescription
          title="Configurações"
          description="Gerencie as configurações da sua conta."
        />
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
