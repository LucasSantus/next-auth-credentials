"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { InboxIcon, LucideIcon } from "lucide-react";
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
        joyrideTarget: "first-step",
      },
    ],
  },
  {
    title: "Configurações",
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
  return (
    <aside className="sticky top-0 hidden min-h-screen w-full min-w-64 max-w-64 border-r bg-muted/40 transition-all delay-300 duration-300 ease-out md:block">
      <ScrollArea className="h-full p-1">
        <nav className="grid space-y-2 p-3">
          {menuOptions.map(({ title, items }, index) => (
            <Fragment key={index}>
              <div className="space-y-2 overflow-hidden">
                {title && (
                  <p className="overflow-hidden truncate text-ellipsis text-xs font-medium text-muted-foreground">
                    {title}
                  </p>
                )}

                <div className="grid items-center space-y-2">
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
      </ScrollArea>
    </aside>
  );
}
