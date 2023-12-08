"use client";

import { KeyRound } from "lucide-react";
import { useEffect } from "react";
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
    <div className="grid gap-4">
      <AuthTitle
        title="Resetar Senha"
        description="Ops, houve um problema ao tentar acessar as informações!"
        icon={KeyRound}
      />
      <span>{JSON.stringify(error)}</span>
    </div>
  );
}
