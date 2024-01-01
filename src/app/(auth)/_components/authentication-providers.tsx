"use client";

import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";
import { Fragment, useState } from "react";

interface AuthenticationProviderProps {
  isLoading: boolean;
}

export function AuthenticationProviders({
  isLoading,
}: AuthenticationProviderProps): JSX.Element {
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  async function onHandleClick(provider: LiteralUnion<BuiltInProviderType>) {
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
        className="gap-2"
        isLoading={isLoading || isRedirecting}
        onClick={() => onHandleClick("google")}
        variant="outline"
        icon={<GoogleIcon />}
      >
        Google
      </Button>
    </Fragment>
  );
}
