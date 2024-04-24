import { Step } from "react-joyride";
import { JoyrideTargetEnum } from "../types";
import { joyrideStepItem } from "./step-item";

export const joyrideSteps: Step[] = [
  joyrideStepItem({
    title: "Next Auth Credentials",
    content: "Seja Bem Vindo ao Next Auth Credentials!",
    placement: "center",
    target: JoyrideTargetEnum.Welcome,
  }),
  joyrideStepItem({
    title: "Teste ",
    content: "Seja Bem Vindo ao Teste !",
    placement: "bottom",
    target: JoyrideTargetEnum.Teste1,
  }),
  joyrideStepItem({
    title: "Teste 2",
    content: "Seja Bem Vindo ao Teste 2!",
    placement: "right",
    target: JoyrideTargetEnum.Teste2,
  }),
  joyrideStepItem({
    title: "Teste 3",
    content: "Seja Bem Vindo ao Teste 3!",
    placement: "right-start",
    target: JoyrideTargetEnum.Teste3,
  }),
];
