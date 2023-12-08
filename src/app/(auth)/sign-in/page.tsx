import { authOptions } from "@/lib/auth";
import { LogInIcon } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthLink } from "../_components/auth-link";
import { AuthTitle } from "../_components/auth-title";
import { SignInForm } from "./form";

export const metadata: Metadata = {
  title: "Log In",
};

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="grid gap-2">
      <AuthTitle
        title="Log In"
        description="Insira os dados abaixo para fazer login em sua conta"
        icon={LogInIcon}
      />

      <SignInForm />

      <div className="flex items-center justify-center gap-1">
        <span className="text-sm text-slate-500">Não possuí uma conta?</span>
        <AuthLink title="Crie uma grátis" href="/sign-up" />
      </div>
    </div>
  );
}
