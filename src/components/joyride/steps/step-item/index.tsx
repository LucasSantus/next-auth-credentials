import { Placement, Step } from "react-joyride";
import { locale } from "../../locale";
import { JoyrideTargetEnum } from "../../types";
import { JoyrideStepDescription } from "./step-description";
import { JoyrideStepTitle } from "./step-title";

interface JoyrideStepItemProps {
  title: string;
  content: string;
  placement: "center" | Placement | "auto";
  target: JoyrideTargetEnum;
}

export function joyrideStepItem({
  title,
  content,
  placement,
  target,
}: JoyrideStepItemProps): Step {
  return {
    title: <JoyrideStepTitle>{title}</JoyrideStepTitle>,
    content: <JoyrideStepDescription>{content}</JoyrideStepDescription>,
    target: "." + target,
    placement,
    locale,
  };
}
