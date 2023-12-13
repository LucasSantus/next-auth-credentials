"use client";

import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";

export interface InputPasswordProps extends InputProps {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ disabled, loading, ...rest }, ref) => {
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
        />
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="absolute bottom-0 right-0 top-0 z-10 rounded-bl-none rounded-tl-none"
          onClick={handleChangeType}
          disabled={disabled}
        >
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2Icon className="h-5 w-5 animate-spin" />
            </div>
          ) : isShow ? (
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
