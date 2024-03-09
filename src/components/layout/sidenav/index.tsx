"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { isBrowser } from "@/utils/is-browser";
import {
  ChevronRightIcon,
  InboxIcon,
  LucideIcon,
  SettingsIcon,
} from "lucide-react";
import { Fragment, useState } from "react";
import { SidenavItem } from "./sidenav-item";

interface MenuItems {
  path: string;
  icon: LucideIcon;
  text: string;
  subItems?: Array<MenuItems>;
}

interface MenuOptions {
  title?: string;
  items: Array<MenuItems>;
}

const menuOptions: MenuOptions[] = [
  {
    items: [
      {
        path: "/dashboard",
        icon: InboxIcon,
        text: "Dashboard",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        path: "/inbox",
        icon: InboxIcon,
        text: "Inbox",
      },
      {
        path: "/billing",
        icon: InboxIcon,
        text: "Billing",
      },
      {
        path: "/notifications",
        icon: InboxIcon,
        text: "Notifications",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        path: "/settings/account",
        icon: SettingsIcon,
        text: "General Settings",
      },
      {
        path: "/privacy",
        icon: InboxIcon,
        text: "Privacy",
      },
      {
        path: "/logs",
        icon: InboxIcon,
        text: "Logs",
      },
    ],
  },
];

export default function SideNav() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  const mobileWidth = isBrowser() ? window.innerWidth < 768 : false;

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen w-full border-r transition-all delay-300 duration-300 ease-out md:block",
        mobileWidth || isCollapsed
          ? "min-w-64 max-w-64"
          : "min-w-24 max-w-[100px]",
      )}
    >
      <TooltipProvider>
        <ScrollArea className="h-full p-1">
          <nav className="grid space-y-2 p-3">
            {menuOptions.map(({ title, items }, index) => (
              <Fragment key={index}>
                <div className="space-y-3 overflow-hidden">
                  {title && (
                    <span className="w-full truncate text-xs font-medium text-muted-foreground">
                      {title}
                    </span>
                  )}

                  <div className="grid items-center space-y-2">
                    {items.map(({ icon, path, text }, indexItem) => (
                      <SidenavItem
                        icon={icon}
                        isCollapsed={isCollapsed}
                        path={path}
                        text={text}
                        key={path + indexItem}
                      />
                    ))}
                  </div>
                  {index !== menuOptions.length - 1 && <Separator />}
                </div>
              </Fragment>
            ))}

            {!mobileWidth && (
              <Button
                onClick={toggleSidebar}
                variant="secondary"
                className="border p-2"
              >
                <ChevronRightIcon
                  className={cn(
                    "h-5 w-5 transition-all delay-500 duration-500 ease-out",
                    isCollapsed && "rotate-180",
                  )}
                />
              </Button>
            )}
          </nav>
        </ScrollArea>
      </TooltipProvider>
    </aside>
  );
}
