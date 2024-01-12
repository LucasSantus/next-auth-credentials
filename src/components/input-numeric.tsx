import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "./ui/input";

export interface InputNumericProps extends NumericFormatProps {}

const InputNumeric = forwardRef<HTMLInputElement, InputNumericProps>(
  (props, ref) => {
    return (
      <NumericFormat
        getInputRef={ref}
        customInput={Input}
        allowLeadingZeros
        allowNegative
        prefix="R$ "
        thousandSeparator=","
        decimalSeparator="."
        {...props}
      />
    );
  },
);
InputNumeric.displayName = "InputNumeric";

export { InputNumeric };
