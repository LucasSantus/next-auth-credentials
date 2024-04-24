import { ReactNode } from "react";

export interface SidebarItemsData {
  title: string;
  href: string;
  icon: ReactNode;
  provider: "all" | "credentials";
}
