"use client";

import { KeyRound } from "lucide-react";
import { useEffect } from "react";
import {
  AuthLayout,
  AuthLayoutContent,
  AuthLayoutImage,
} from "../../_components/auth-layout";
import { AuthTitle } from "../../_components/auth-title";

export default function ResetPasswordErrorHandling({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AuthLayout>
      <AuthLayoutImage>teste</AuthLayoutImage>
      <AuthLayoutContent rowInverse>
        <AuthTitle
          title="Resetar Senha"
          description="Ops, houve um problema ao tentar acessar as informações!"
          icon={KeyRound}
        />
        <span>{JSON.stringify(error)}</span>
      </AuthLayoutContent>
    </AuthLayout>
  );
}
