import { PropsWithChildren } from "react";

interface JoyrideStepTitleProps extends PropsWithChildren {}

export function JoyrideStepTitle({
  children,
}: JoyrideStepTitleProps): JSX.Element {
  return (
    <span className="text-base font-semibold text-black/80">{children}</span>
  );
}
