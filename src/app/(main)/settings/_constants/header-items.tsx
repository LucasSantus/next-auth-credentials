import { ICON_SIZE } from "@/constants/globals";
import { SidebarItemsType } from "@/types/sidebar-items-type";
import { LayoutDashboardIcon, SettingsIcon } from "lucide-react";

export const headerItems: Array<SidebarItemsType> = [
  {
    title: "Voltar para Dashboard",
    href: "/",
    icon: <LayoutDashboardIcon className={ICON_SIZE} />,
    provider: "all",
  },
  {
    title: "Configurações",
    href: "/settings/account",
    icon: <SettingsIcon className={ICON_SIZE} />,
    provider: "all",
  },
];
