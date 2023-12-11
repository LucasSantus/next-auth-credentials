"use client";

import { KeyRound } from "lucide-react";
import { useEffect } from "react";
import { AuthTitle } from "../../_components/auth-title";
import { AuthenticationLayout } from "../../_components/authentication-layout";

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
    <AuthenticationLayout>
      <AuthTitle
        title="Resetar Senha"
        description="Ops, houve um problema ao tentar acessar as informações!"
        icon={KeyRound}
      />
      <span>{JSON.stringify(error)}</span>
    </AuthenticationLayout>
  );
}
