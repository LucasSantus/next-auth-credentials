import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthLink } from "../_components/auth-link";
import { AuthTitle } from "../_components/auth-title";
import { SignUpForm } from "./form";

export default async function Sign() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="grid gap-2">
      <AuthTitle
        title="Crie sua conta"
        description="Insira os dados abaixo para criar sua conta"
      />

      <SignUpForm />

      <div className="flex items-center justify-center gap-1">
        <span className="text-sm text-slate-500">Voltar para o</span>
        <AuthLink title="Log In" href="/sign-in" />
      </div>
    </div>
  );
}
