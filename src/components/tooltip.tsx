import {
  Tooltip as ShadCnTooltip,
  TooltipContent as ShadCnTooltipContent,
  TooltipProvider as ShadCnTooltipProvider,
  TooltipTrigger as ShadCnTooltipTrigger,
} from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";

interface TooltipProps extends PropsWithChildren {
  description: string;
}

export function Tooltip({ children, description }: TooltipProps): JSX.Element {
  return (
    <ShadCnTooltipProvider>
      <ShadCnTooltip>
        <ShadCnTooltipTrigger asChild>{children}</ShadCnTooltipTrigger>
        <ShadCnTooltipContent>
          <p>{description}</p>
        </ShadCnTooltipContent>
      </ShadCnTooltip>
    </ShadCnTooltipProvider>
  );
}
