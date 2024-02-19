import { ICON_SIZE } from "@/constants/globals";
import { KeyRound, Palette, UserSquare } from "lucide-react";
import { SettingsSidebarNavType } from "./layout";

export const sidebarNavItems: SettingsSidebarNavType[] = [
  {
    title: "Conta",
    href: "/settings/account",
    icon: <UserSquare className={ICON_SIZE} />,
    provider: "all",
  },
  {
    title: "Senha",
    href: "/settings/password",
    icon: <KeyRound className={ICON_SIZE} />,
    provider: "credentials",
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
    icon: <Palette className={ICON_SIZE} />,
    provider: "all",
  },
];
