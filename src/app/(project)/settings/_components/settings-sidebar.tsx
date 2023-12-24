"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
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
      {items.map(({ title, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "flex justify-start gap-2",
          )}
        >
          <Fragment>
            {Icon}
            {title}
          </Fragment>
        </Link>
      ))}
    </nav>
  );
}
