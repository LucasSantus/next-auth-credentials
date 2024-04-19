"use client";

import { SIDEBAR_KEY_LOCAL_STORAGE } from "@/constants/globals";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PropsWithChildren, createContext, useState } from "react";

interface SidebarData {
  isActive: boolean;
  toogle: () => void;
}

export const SidebarContext = createContext({} as SidebarData);

export function SidebarProvider({ children }: PropsWithChildren): JSX.Element {
  const [isOpenSidebar, setIsOpenSidebar] = useLocalStorage<boolean>(
    SIDEBAR_KEY_LOCAL_STORAGE,
    true,
  );
  const [isActive, setIsActive] = useState<boolean>(isOpenSidebar);

  function toogle() {
    setIsActive(!isActive);
    setIsOpenSidebar(!isActive);
  }

  return (
    <SidebarContext.Provider
      value={{
        isActive,
        toogle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
