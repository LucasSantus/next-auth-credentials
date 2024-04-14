"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItems } from ".";

interface SidenavItemProps extends MenuItems {}

export function SidenavItem({
  text,
  path,
  joyrideTarget,
  icon: Icon,
}: SidenavItemProps): JSX.Element {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={cn(
        "bg-muted-30 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-muted/70",
        joyrideTarget,
        pathName.startsWith(path) ? "bg-muted text-foreground shadow-sm" : "",
      )}
    >
      <Icon className="size-4" />
      <span>{text}</span>
    </Link>
  );
}
