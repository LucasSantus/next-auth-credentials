import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface LocaleItemProps extends ComponentProps<"span"> {}

export function LocaleItem({
  className,
  ...rest
}: LocaleItemProps): JSX.Element {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-md text-sm font-medium text-white",
        className,
      )}
      {...rest}
    />
  );
}
