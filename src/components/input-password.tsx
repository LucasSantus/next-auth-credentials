"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";

export interface InputPasswordProps extends InputProps {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ ...props }, ref) => {
    const [isShow, setIsShow] = React.useState<boolean>(false);

    function handleChangeType() {
      setIsShow((currentValue) => !currentValue);
    }

    return (
      <div className="relative">
        <Input ref={ref} {...props} type={isShow ? "text" : "password"} />
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="absolute bottom-0 right-0 top-0 z-10 rounded-bl-none rounded-tl-none"
          onClick={handleChangeType}
        >
          {isShow ? (
            <EyeIcon className="h-4 w-4" />
          ) : (
            <EyeOffIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  },
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
