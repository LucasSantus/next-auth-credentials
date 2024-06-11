"use client";

import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Fragment, ReactNode } from "react";

interface ProjectTemplateProps {
  children: ReactNode;
}

// const Joyride = dynamic(
//   () => import("../../../components/joyride").then(({ Joyride }) => Joyride),
//   {
//     ssr: false,
//   },
// );

export default function ProjectTemplate({ children }: ProjectTemplateProps) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <Fragment>
      <Sidebar />

      {/* <Joyride /> */}

      {/* <div className="welcome" /> */}

      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        {children}
      </main>

      <footer
        className={cn(
          "transition-[margin-left] duration-300 ease-in-out",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <Footer />
      </footer>
    </Fragment>
  );
}
