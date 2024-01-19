import { AuthenticationRedirect } from "./authentication-redirect";

export function AlreadyAccount(): JSX.Element {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="text-sm text-muted-foreground">
        Já possuí uma conta?
      </span>
      <AuthenticationRedirect title="Logar" href="/sign-in" />
    </div>
  );
}
