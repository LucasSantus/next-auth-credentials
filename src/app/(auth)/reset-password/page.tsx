import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthLink } from "../_components/auth-link";
import { AuthTitle } from "../_components/auth-title";
import { ResetPasswordForm } from "./form";

export default async function ResetPassword() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="grid gap-2">
      <AuthTitle
        title="Recuperação de conta"
        description="Digite seu e-mail abaixo para recuperar sua conta"
      />

      <ResetPasswordForm />

      <div className="flex items-center justify-center gap-1">
        <span className="text-sm text-slate-500">Não possuí uma conta?</span>
        <AuthLink title="Crie uma grátis" href="/sign-up" />
      </div>

      <div className="flex items-center justify-center gap-1">
        <span className="text-sm text-slate-500">Voltar para o</span>
        <AuthLink title="Log In" href="/sign-in" />
      </div>
    </div>
  );
}
