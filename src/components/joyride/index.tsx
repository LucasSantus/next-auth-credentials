import { JoyrideData } from "@/components/joyride/types";
import { JOYRIDE_KEY_LOCAL_STORAGE } from "@/constants/globals";
import { useState } from "react";
import ReactJoyride, { CallBackProps, STATUS } from "react-joyride";
import { useLocalStorage } from "usehooks-ts";
import { joyrideSteps } from "./steps";

interface JoyrideProps {}

export function Joyride({}: JoyrideProps): JSX.Element {
  const [joyrideValueOnStorage, setJoyrideValueOnStorage] =
    useLocalStorage<boolean>(JOYRIDE_KEY_LOCAL_STORAGE, true);

  const [{ run, steps }] = useState<JoyrideData>({
    run: joyrideValueOnStorage,
    steps: joyrideSteps,
  });

  const handleJoyrideCallback = ({ status }: CallBackProps) => {
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setJoyrideValueOnStorage(false);
    }
  };

  const buttonStyles = {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.4rem",
    paddingBottom: "0.4rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    borderRadius: "0.3rem",
    border: "1px solid hsl(var(--foreground))",
    color: "hsl(var(--foreground))",
  };

  return (
    <ReactJoyride
      steps={steps}
      styles={{
        options: {
          overlayColor: "rgba(0, 0, 0, 0.6)",
          textColor: "#FFFFFF",
          width: 500,
          zIndex: 1000,
          backgroundColor: "rgba(255,255,255,1)",
          arrowColor: "rgba(255,255,255,1)",
        },
        buttonNext: {
          ...buttonStyles,
          backgroundColor: "hsl(var(--primary))",
        },
        buttonBack: {
          ...buttonStyles,
          color: "hsl(var(--primary))",
        },
      }}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      disableCloseOnEsc
      showSkipButton
      disableOverlayClose
      callback={handleJoyrideCallback}
    />
  );
}
