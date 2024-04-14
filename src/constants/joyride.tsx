import { Locale, Step } from "react-joyride";

export interface JoyrideType {
  run: boolean;
  steps: Step[];
}

const locale: Locale = {
  skip: (
    <span aria-label="skip" className="hover:opacity-60">
      Skip
    </span>
  ),
  next: (
    <span
      aria-label="next"
      className="whitespace-nowrap rounded-md text-sm font-medium"
    >
      Próximo
    </span>
  ),
  back: (
    <span
      aria-label="back"
      className="whitespace-nowrap rounded-md text-sm font-medium"
    >
      Anterior
    </span>
  ),
  last: (
    <span
      aria-label="back"
      className="whitespace-nowrap rounded-md text-sm font-medium"
    >
      Último
    </span>
  ),
};

export const joyride: JoyrideType = {
  run: false,
  steps: [
    {
      content: <h2>Seja Bem Vindo ao Next Auth Credentials!</h2>,
      placement: "center",
      target: ".first-step",
      locale,
    },
    {
      content: <h2>Sticky elements</h2>,
      placement: "bottom",
      target: ".second-step",
      locale,
    },
    {
      title: "Our projects",
      content: "These are our super awesome projects!",
      placement: "left",
      target: ".third-step",
      locale,
    },
    {
      title: "Our Mission",
      content: (
        <div>
          You can render anything!
          <br />
          <h3>Like this H3 title</h3>
        </div>
      ),
      placement: "top",
      target: ".four-step",
      locale,
    },
    {
      content: <div></div>,
      placement: "bottom",
      target: ".five-step",
      locale,
    },
  ],
};
