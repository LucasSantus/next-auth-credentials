"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidenavItemProps {
  text: string;
  path: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

export function SidenavItem({
  text,
  path,
  icon: Icon,
  isCollapsed = false,
}: SidenavItemProps): JSX.Element {
  const pathName = usePathname();

  const classNames = cn(
    "inline-flex items-center whitespace-nowrap border select-none text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:opacity-60 h-10 rounded-md gap-3 items-center px-5 text-foreground",
    { "bg-muted shadow-sm": pathName.startsWith(path) },
  );

  if (isCollapsed)
    return (
      <Link href={path} className={classNames}>
        <Icon className="h-6 w-6" />
        <span>{text}</span>
      </Link>
    );

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link href={path} className={classNames}>
          <Icon className="h-6 w-6" />
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, display: "none" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {text}
          </motion.span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={20}>
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
