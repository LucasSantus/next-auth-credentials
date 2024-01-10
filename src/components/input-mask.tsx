import { forwardRef } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { Input } from "./ui/input";

export interface InputMaskProps extends PatternFormatProps {}

const InputMask = forwardRef<HTMLInputElement, InputMaskProps>((props, ref) => {
  return (
    <PatternFormat getInputRef={ref} customInput={Input} mask="_" {...props} />
  );
});
InputMask.displayName = "InputMask";

export { InputMask };
