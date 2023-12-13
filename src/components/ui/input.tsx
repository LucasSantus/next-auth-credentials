import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, loading, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {loading && (
          <div className="absolute bottom-0 right-0 top-0 z-10 flex h-full w-10 items-center justify-center">
            <Loader2Icon className="h-5 w-5 animate-spin" />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
