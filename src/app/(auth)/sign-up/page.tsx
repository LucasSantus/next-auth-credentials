import { KeyRound } from "lucide-react";
import { Metadata } from "next";
import {
  AuthLayout,
  AuthLayoutContent,
  AuthLayoutImage,
} from "../_components/auth-layout";
import { AuthLink } from "../_components/auth-link";
import { AuthTitle } from "../_components/auth-title";
import { SignUpForm } from "./form";

export const metadata: Metadata = {
  title: "New User",
};

export default function SignUp(): JSX.Element {
  return (
    <AuthLayout>
      <AuthLayoutImage>teste</AuthLayoutImage>

      <AuthLayoutContent rowInverse>
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
      </AuthLayoutContent>
    </AuthLayout>
  );
}
