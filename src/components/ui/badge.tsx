import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-1 text-sm lowercase font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-custom-purple-950 focus:ring-offset-2 dark:border-custom-purple-800 dark:focus:ring-custom-purple-300",
  {
    variants: {
      variant: {
        default: "bg-custom-purple-300/20 text-custom-purple-300 border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
