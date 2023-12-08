import { authOptions } from "@/lib/auth";
import { KeyRound } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthLink } from "../_components/auth-link";
import { AuthTitle } from "../_components/auth-title";
import { SignUpForm } from "./form";

export const metadata: Metadata = {
  title: "New User",
};

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="grid gap-2">
      <AuthTitle
        title="Crie sua conta"
        description="Insira os dados abaixo para criar sua conta"
        icon={KeyRound}
      />

      <SignUpForm />

      <div className="flex items-center justify-center gap-1">
        <span className="text-sm text-slate-500">Já possuí uma conta?</span>
        <AuthLink title="Logar" href="/sign-in" />
      </div>
    </div>
  );
}
