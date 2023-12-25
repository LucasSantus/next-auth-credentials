import { Framing } from "@/components/framer-motion/framing";
import { Separator } from "@/components/ui/separator";
import { TRANSITION_DURATION } from "@/constants/globals";
import { authOptions } from "@/lib/auth";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { KeyRound, Palette, UserSquare } from "lucide-react";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { ProjectLayout } from "../_components/project-layout";
import { SettingsSidebar } from "./_components/settings-sidebar";

export interface SettingsSidebarNavType {
  title: string;
  href: string;
  icon: ReactNode;
}

const ICON_CLASSNAMES = "w-4 h-4";

const sidebarNavItems: SettingsSidebarNavType[] = [
  {
    title: "Conta",
    href: "/settings/account",
    icon: <UserSquare className={ICON_CLASSNAMES} />,
  },
  {
    title: "Senha",
    href: "/settings/password",
    icon: <KeyRound className={ICON_CLASSNAMES} />,
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
    icon: <Palette className={ICON_CLASSNAMES} />,
  },
];

interface GlobalSettingsLayoutProps {
  children: React.ReactNode;
}

export default async function GlobalSettingsLayout({
  children,
}: GlobalSettingsLayoutProps) {
  const session = await getServerSession(authOptions);

  const delayLayout = sidebarNavItems.length + TRANSITION_DURATION * 0.3;

  return (
    <ProjectLayout session={session}>
      <div className="space-y-6 p-10 pb-16">
        <Framing className="grid gap-1" {...bounceHorizontalAnimation({})}>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
            <p className="text-muted-foreground">
              Gerencie as configurações da sua conta e defina preferências de
              e-mail.
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
              delay: delayLayout,
            })}
          >
            {children}
          </Framing>
        </div>
      </div>
    </ProjectLayout>
  );
}
