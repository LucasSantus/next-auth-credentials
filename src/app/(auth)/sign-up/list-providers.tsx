"use client";

import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";

interface ButtonListProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export function ButtonList({ providers }: ButtonListProps) {
  if (!providers) {
    return <p>No authentication providers available</p>;
  }

  return (
    <div className="flex h-full items-center justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button
            onClick={() => {
              signIn(provider.id, {
                redirect: true,
              });
            }}
          >
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
