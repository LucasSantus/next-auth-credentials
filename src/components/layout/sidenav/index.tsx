"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { isBrowser } from "@/utils/is-browser";
import { ChevronRight, Inbox, LucideIcon, Settings } from "lucide-react";
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
        icon: Inbox,
        text: "Dashboard",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        path: "/inbox",
        icon: Inbox,
        text: "Inbox",
      },
      {
        path: "/billing",
        icon: Inbox,
        text: "Billing",
      },
      {
        path: "/notifications",
        icon: Inbox,
        text: "Notifications",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        path: "/settings",
        icon: Settings,
        text: "General Settings",
      },
      {
        path: "/privacy",
        icon: Inbox,
        text: "Privacy",
      },
      {
        path: "/logs",
        icon: Inbox,
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
        mobileWidth || isCollapsed ? "min-w-64 max-w-64" : "min-w-20 max-w-20",
      )}
    >
      <TooltipProvider>
        <nav className="grid space-y-2 p-3">
          {menuOptions.map(({ title, items }, index) => (
            <Fragment key={index}>
              <div className="space-y-3 overflow-hidden">
                {title && (
                  <span className="truncate text-xs font-medium text-muted-foreground">
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
            <Button onClick={toggleSidebar} variant="secondary" className="p-2">
              <ChevronRight
                className={cn(
                  "h-5 w-5 transition-all delay-500 duration-500 ease-out",
                  isCollapsed && "rotate-180",
                )}
              />
            </Button>
          )}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
