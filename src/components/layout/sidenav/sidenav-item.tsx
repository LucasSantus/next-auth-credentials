"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidenavItemProps {
  text: string;
  path: string;
  icon: LucideIcon;
}

export function SidenavItem({
  text,
  path,
  icon: Icon,
}: SidenavItemProps): JSX.Element {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-muted/70",
        pathName.startsWith(path) ? "bg-muted text-foreground shadow-sm" : "",
      )}
    >
      <Icon className="size-4" />
      <span>{text}</span>
    </Link>
  );
}
