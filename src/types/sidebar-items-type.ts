import { ReactNode } from "react";

export interface SidebarItemsType {
  title: string;
  href: string;
  icon: ReactNode;
  provider: "all" | "credentials";
}
