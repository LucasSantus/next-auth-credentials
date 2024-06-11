import { SidebarItemsData } from "@/types/sidebar-items-type";
import { KeyRoundIcon, PaletteIcon, UserSquareIcon } from "lucide-react";

export const sidebarItems: Array<SidebarItemsData> = [
  {
    title: "Conta",
    href: "/settings/account",
    icon: <UserSquareIcon className="size-4" />,
    provider: "all",
  },
  {
    title: "Senha",
    href: "/settings/password",
    icon: <KeyRoundIcon className="size-4" />,
    provider: "credentials",
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
    icon: <PaletteIcon className="size-4" />,
    provider: "all",
  },
];
