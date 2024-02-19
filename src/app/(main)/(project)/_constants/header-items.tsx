import { ICON_SIZE } from "@/constants/globals";
import { SidebarItemsType } from "@/types/sidebar-items-type";
import { SettingsIcon } from "lucide-react";

export const headerItems: SidebarItemsType[] = [
  {
    title: "Configurações",
    href: "/settings/account",
    icon: <SettingsIcon className={ICON_SIZE} />,
    provider: "all",
  },
];
