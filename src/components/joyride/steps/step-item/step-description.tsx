import { PropsWithChildren } from "react";

interface JoyrideStepDescriptionProps extends PropsWithChildren {}

export function JoyrideStepDescription({
  children,
}: JoyrideStepDescriptionProps): JSX.Element {
  return (
    <span className="text-justify text-sm font-semibold text-black/60">
      {children}
    </span>
  );
}
