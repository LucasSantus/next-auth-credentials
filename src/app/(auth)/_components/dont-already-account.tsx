import { AuthenticationRedirect } from "./authentication-redirect";

export function DontAlreadyAccount(): JSX.Element {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="text-muted-foreground text-sm">
        Não possuí uma conta?
      </span>
      <AuthenticationRedirect title="Crie uma gratis!" href="/sign-up" />
    </div>
  );
}
