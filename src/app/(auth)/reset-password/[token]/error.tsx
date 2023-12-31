"use client";

import { KeyRound } from "lucide-react";
import { Fragment, useEffect } from "react";
import { AuthenticationDescription } from "../../_components/authentication-description";

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
    <Fragment>
      <AuthenticationDescription
        title="Resetar Senha"
        description="Ops, houve um problema ao tentar acessar as informações!"
        icon={KeyRound}
      />
      <span className="text-destructive">{error.message}</span>
    </Fragment>
  );
}
