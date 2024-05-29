import { SidebarItemsData } from "@/types/sidebar-items-type";
import { SettingsIcon } from "lucide-react";

export const headerItems: SidebarItemsData[] = [
  {
    title: "Configurações",
    href: "/settings/account",
    icon: <SettingsIcon className="size-4" />,
    provider: "all",
  },
];
