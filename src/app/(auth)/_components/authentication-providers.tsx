"use client";

import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";
import { Dispatch, Fragment, SetStateAction } from "react";

interface AuthenticationProviderProps {
  isDisabled: boolean;
  isRedirecting: boolean;
  setIsRedirecting: Dispatch<SetStateAction<boolean>>;
}

export function AuthenticationProviders({
  isDisabled,
  isRedirecting,
  setIsRedirecting,
}: AuthenticationProviderProps): JSX.Element {
  async function onHandleSelectedProvider(
    provider: LiteralUnion<BuiltInProviderType>,
  ) {
    setIsRedirecting(true);

    await signIn(provider);

    setIsRedirecting(false);
  }

  return (
    <Fragment>
      <div className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            OU CONTINUAR COM
          </span>
        </div>
      </div>

      <Button
        isLoading={isRedirecting}
        onClick={() => onHandleSelectedProvider("google")}
        variant="outline"
        icon={<GoogleIcon />}
        disabled={isDisabled}
      >
        Google
      </Button>
    </Fragment>
  );
}
