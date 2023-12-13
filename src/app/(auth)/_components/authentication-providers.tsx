"use client";

import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Fragment, useState } from "react";

interface AuthenticationProviderProps {
  isLoading: boolean;
}

export function AuthenticationProviders({
  isLoading,
}: AuthenticationProviderProps): JSX.Element {
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

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

      <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
        <Button
          className="gap-2"
          isLoading={isLoading || isRedirecting}
          onClick={async () => {
            setIsRedirecting(true);

            await signIn("github");

            setIsRedirecting(false);
          }}
          variant="outline"
          icon={<GitHubIcon />}
        >
          GitHub
        </Button>
        <Button
          className="gap-2"
          isLoading={isLoading || isRedirecting}
          onClick={async () => {
            setIsRedirecting(true);

            await signIn("google");

            setIsRedirecting(false);
          }}
          variant="outline"
          icon={<GoogleIcon />}
        >
          Google
        </Button>
      </div>
    </Fragment>
  );
}
