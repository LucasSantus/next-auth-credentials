"use client";

import { Framing } from "@/components/framer-motion/framing";
import { Presence } from "@/components/framer-motion/presence";
import { buttonVariants } from "@/components/ui/button";
import { TRANSITION_DURATION } from "@/constants/globals";
import { cn } from "@/lib/utils";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsSidebarNavType } from "../layout";

interface SettingsSidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<SettingsSidebarNavType>;
}

export function SettingsSidebar({
  className,
  items,
  ...props
}: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      <Presence>
        {items.map(({ title, href, icon: Icon }, index) => {
          const delay = TRANSITION_DURATION + index * 0.3 + 1;

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
  );
}
