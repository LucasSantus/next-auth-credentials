"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";

export interface InputPasswordProps extends InputProps {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ disabled, ...rest }, ref) => {
    const [isShow, setIsShow] = React.useState<boolean>(false);

    function handleChangeType() {
      setIsShow((currentValue) => !currentValue);
    }

    return (
      <div className="relative">
        <Input
          ref={ref}
          {...rest}
          disabled={disabled}
          type={isShow ? "text" : "password"}
          endComponent={
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={handleChangeType}
              disabled={disabled}
            >
              {isShow ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeOffIcon className="h-4 w-4" />
              )}
            </Button>
          }
        />
      </div>
    );
  },
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
