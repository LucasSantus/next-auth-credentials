"use client";

import { SIDEBAR_KEY_LOCAL_STORAGE } from "@/constants/globals";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PropsWithChildren, createContext, useState } from "react";

interface SidebarData {
  isExpanded: boolean;
  toogle: () => void;
}

export const SidebarContext = createContext({} as SidebarData);

export function SidebarProvider({ children }: PropsWithChildren): JSX.Element {
  const [isOpenSidebar, setIsOpenSidebar] = useLocalStorage<boolean>(
    SIDEBAR_KEY_LOCAL_STORAGE,
    true,
  );
  const [isExpanded, setisExpanded] = useState<boolean>(isOpenSidebar);

  function toogle() {
    setisExpanded(!isExpanded);
    setIsOpenSidebar(!isExpanded);
  }

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        toogle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
