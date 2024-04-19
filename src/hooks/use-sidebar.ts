import { SidebarContext } from "@/contexts/sidebar-context";
import { useContext } from "react";

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}
