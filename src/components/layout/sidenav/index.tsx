"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft, InboxIcon, LucideIcon } from "lucide-react";
import { Fragment } from "react";
import { SidenavItem } from "./sidenav-item";

export interface MenuItems {
  path: string;
  icon: LucideIcon;
  text: string;
  joyrideTarget: string;
  subItems?: Array<MenuItems>;
}

interface MenuOptions {
  items: Array<MenuItems>;
}

const menuOptions: MenuOptions[] = [
  {
    items: [
      {
        path: "/dashboard",
        icon: InboxIcon,
        text: "Dashboard",
        joyrideTarget: "first-step",
      },
    ],
  },
  {
    items: [
      {
        path: "/settings",
        icon: InboxIcon,
        text: "Inbox",
        joyrideTarget: "second-step",
      },
      {
        path: "/test",
        icon: InboxIcon,
        text: "Teste",
        joyrideTarget: "third-step",
      },
      {
        path: "/test-2",
        icon: InboxIcon,
        text: "Teste 2",
        joyrideTarget: "four-step",
      },
      {
        path: "/test-3",
        icon: InboxIcon,
        text: "Teste 3",
        joyrideTarget: "five-step",
      },
    ],
  },
];

export default function SideNav() {
  const { isActive, toogle } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-0 hidden flex-col border-r bg-background transition-all delay-300 duration-300 ease-out sm:flex md:block",
        isActive ? "w-full min-w-64 max-w-64" : "w-20 min-w-20 max-w-20",
      )}
    >
      <TooltipProvider>
        <ScrollArea className="h-full p-1">
          <nav className="flex flex-col gap-4 px-2 sm:py-4">
            {menuOptions.map(({ items }, index) => (
              <Fragment key={index}>
                <div className="space-y-2 overflow-hidden">
                  <div className="grid space-y-2">
                    {items.map((menuOption, indexItem) => (
                      <SidenavItem
                        key={menuOption.path + indexItem}
                        {...menuOption}
                      />
                    ))}
                  </div>

                  {index !== menuOptions.length - 1 && <Separator />}
                </div>
              </Fragment>
            ))}
          </nav>
          <nav className="flex flex-col gap-4 px-2 sm:py-4">
            <Button
              icon={
                <ChevronLeft
                  className={cn(
                    "size-4 transition-all delay-300 duration-300 ease-out",
                    { "rotate-180": !isActive },
                  )}
                />
              }
              className={cn(
                "flex transition-all delay-300 duration-300 ease-out",
                isActive ? "w-full" : "w-14",
              )}
              variant="outline"
              onClick={toogle}
            />
          </nav>
        </ScrollArea>
      </TooltipProvider>
    </aside>
  );
}
