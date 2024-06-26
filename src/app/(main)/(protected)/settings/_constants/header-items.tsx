import { SidebarItemsData } from "@/types/sidebar-items-type";
import { LayoutDashboardIcon, SettingsIcon } from "lucide-react";

export const headerItems: Array<SidebarItemsData> = [
  {
    title: "Voltar para Dashboard",
    href: "/",
    icon: <LayoutDashboardIcon className="size-4" />,
    provider: "all",
  },
  {
    title: "Configurações",
    href: "/settings/account",
    icon: <SettingsIcon className="size-4" />,
    provider: "all",
  },
];
