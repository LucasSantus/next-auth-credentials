"use client";

import { Framing } from "@/components/framer-motion/framing";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItems } from ".";

interface SidenavProps extends MenuItems {}

export function Sidenav({
  text,
  path,
  joyrideTarget,
  icon: Icon,
}: SidenavProps): JSX.Element {
  const pathName = usePathname();
  const isExpanded = true;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={path}
          className={cn(
            "bg-muted-30 flex h-9 w-full items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground transition-all delay-150 duration-150 ease-out hover:bg-muted/70",
            { "w-14 justify-center": !isExpanded },
            joyrideTarget,
            { "bg-muted text-foreground shadow-sm": pathName.startsWith(path) },
          )}
        >
          <div className={cn({ "px-1.5": isExpanded })}>
            <Icon className="size-5" />
          </div>

          {isExpanded && (
            <Framing
              as="span"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.15,
                  delay: 0.2,
                },
              }}
            >
              {text}
            </Framing>
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{text}</TooltipContent>
    </Tooltip>
  );
}
