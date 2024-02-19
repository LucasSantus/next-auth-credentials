import { ICON_SIZE } from "@/constants/globals";
import { SidebarItemsType } from "@/types/sidebar-items-type";
import { KeyRoundIcon, PaletteIcon, UserSquareIcon } from "lucide-react";

export const sidebarItems: Array<SidebarItemsType> = [
  {
    title: "Conta",
    href: "/settings/account",
    icon: <UserSquareIcon className={ICON_SIZE} />,
    provider: "all",
  },
  {
    title: "Senha",
    href: "/settings/password",
    icon: <KeyRoundIcon className={ICON_SIZE} />,
    provider: "credentials",
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
    icon: <PaletteIcon className={ICON_SIZE} />,
    provider: "all",
  },
];
