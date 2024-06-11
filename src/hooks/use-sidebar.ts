import { SIDEBAR_KEY_LOCAL_STORAGE } from "@/constants/globals";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface useSidebarToggleStore {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useSidebarToggle = create(
  persist<useSidebarToggleStore>(
    (set, get) => ({
      isOpen: true,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      },
    }),
    {
      name: SIDEBAR_KEY_LOCAL_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
