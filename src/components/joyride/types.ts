import { Step } from "react-joyride";

export interface JoyrideData {
  run: boolean;
  steps: Step[];
}

export enum JoyrideTargetEnum {
  Welcome = "welcome",
  Teste1 = "Teste",
  Teste2 = "Teste2",
  Teste3 = "Teste3",
}
