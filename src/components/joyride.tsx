import { JoyrideType, joyride } from "@/constants/joyride";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import ReactJoyride, { CallBackProps, STATUS } from "react-joyride";

interface JoyrideProps {}

export function Joyride({}: JoyrideProps): JSX.Element {
  const [value, setValue] = useLocalStorage("joyride", true);

  const [{ run, steps }] = useState<JoyrideType>({ ...joyride, run: value });

  const handleJoyrideCallback = ({ status }: CallBackProps) => {
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setValue(false);
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
    border: "1px solid hsl(var(--primary))",
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
          backgroundColor: "hsl(var(--muted))",
          arrowColor: "hsl(var(--muted))",
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
