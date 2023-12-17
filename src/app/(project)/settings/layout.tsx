import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ProjectLayout } from "../_components/project-layout";
import { SettingsSidebar } from "./_components/settings-sidebar";

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/settings/profile",
  },
  {
    title: "Conta",
    href: "/settings/account",
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
  },
];

interface GlobalSettingsLayoutProps {
  children: React.ReactNode;
}

export default async function GlobalSettingsLayout({
  children,
}: GlobalSettingsLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <ProjectLayout session={session}>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua conta e defina preferências de
            e-mail.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingsSidebar items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </ProjectLayout>
  );
}
