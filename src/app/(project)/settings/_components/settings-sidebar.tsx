"use client";

import { Framing } from "@/components/framer-motion/framing";
import { Presence } from "@/components/framer-motion/presence";
import { buttonVariants } from "@/components/ui/button";
import { TRANSITION_DURATION } from "@/constants/globals";
import { cn } from "@/lib/utils";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { Account } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsSidebarNavType } from "../layout";

interface SettingsSidebarProps {
  items: Array<SettingsSidebarNavType>;
  account: Account;
}

export function SettingsSidebar({ items, account }: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="-mx-4 lg:w-1/5">
      <nav
        className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}
      >
        <Presence>
          {items.map(({ title, href, icon: Icon, provider }, index) => {
            const delay = TRANSITION_DURATION + index * 0.3 + 1;

            if (provider !== "all" && account.provider !== provider) return;

            return (
              <Framing key={href} {...bounceHorizontalAnimation({ delay })}>
                <Link
                  href={href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "flex justify-start gap-2",
                  )}
                >
                  {Icon}
                  {title}
                </Link>
              </Framing>
            );
          })}
        </Presence>
      </nav>
    </aside>
  );
}
