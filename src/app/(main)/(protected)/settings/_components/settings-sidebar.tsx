"use client";

import { Framing } from "@/components/framer-motion/framing";
import { Presence } from "@/components/framer-motion/presence";
import { buttonVariants } from "@/components/ui/button";
import { TRANSITION_DURATION } from "@/constants/globals";
import { cn } from "@/lib/utils";
import { SidebarItemsData } from "@/types/sidebar-items-type";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SettingsSidebarProps {
  items: Array<SidebarItemsData>;
}

export function SettingsSidebar({ items }: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}>
      <Presence>
        {items.map(({ title, href, icon }, index) => {
          const delay = TRANSITION_DURATION + index * 0.3 + 1;

          return (
            <Framing key={href} {...bounceHorizontalAnimation({ delay })}>
              <Link
                href={href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex justify-start gap-2 border hover:bg-muted focus:opacity-50",
                  pathname === href && "bg-muted/70 hover:bg-muted",
                )}
              >
                {icon}
                {title}
              </Link>
            </Framing>
          );
        })}
      </Presence>
    </nav>
  );
}
