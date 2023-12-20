import * as React from "react";
import { Input, InputProps } from "./ui/input";

export interface InputMaskProps extends InputProps {
  onMask: (value: string) => string;
}

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ onChange, onMask, ...rest }, ref) => {
    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = onMask(event.target.value);

      const newEvent = {
        ...event,
        target: {
          ...event.target,
          value: formattedValue,
        },
      };

      if (onChange) onChange(newEvent);
    };

    return <Input ref={ref} {...rest} onChange={onHandleChange} />;
  },
);
InputMask.displayName = "InputMask";

export { InputMask };
