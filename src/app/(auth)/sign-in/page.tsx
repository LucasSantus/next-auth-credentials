import { SignInImage } from "@/components/icons/SignIn";
import { LogInIcon } from "lucide-react";
import { Metadata } from "next";
import {
  AuthLayout,
  AuthLayoutContent,
  AuthLayoutImage,
} from "../_components/auth-layout";
import { AuthLink } from "../_components/auth-link";
import { AuthTitle } from "../_components/auth-title";
import { SignInForm } from "./form";

export const metadata: Metadata = {
  title: "Log In",
};

export default function SignIn(): JSX.Element {
  return (
    <AuthLayout>
      <AuthLayoutImage>
        <SignInImage className="max-w-lg" />
      </AuthLayoutImage>

      <AuthLayoutContent>
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
      </AuthLayoutContent>
    </AuthLayout>
  );
}
