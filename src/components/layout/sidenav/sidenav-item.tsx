"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
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
  const { isActive } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={path}
          className={cn(
            "bg-muted-30 flex h-9 w-full items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground transition-all delay-300 duration-300 ease-out hover:bg-muted/70",
            { "w-14 justify-center": !isActive },
            joyrideTarget,
            { "bg-muted text-foreground shadow-sm": pathName.startsWith(path) },
          )}
        >
          <Icon className="size-5" />
          <span
            className={cn("transition-all delay-1000 duration-1000 ease-out", {
              "sr-only": !isActive,
            })}
          >
            {text}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{text}</TooltipContent>
    </Tooltip>
  );
}

{
  /* <Tooltip>
  <TooltipTrigger asChild>
    <Link
      href="#"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    >
      <Home className="h-5 w-5" />
      <span className="sr-only">Dashboard</span>
    </Link>
  </TooltipTrigger>
  <TooltipContent side="right">Dashboard</TooltipContent>
</Tooltip>; */
}
