import { Separator } from "@/components/ui/separator";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import {
  AuthLayout,
  AuthLayoutContent,
  AuthLayoutImage,
} from "../_components/auth-layout";
import { AuthLink } from "../_components/auth-link";
import { AuthTitle } from "../_components/auth-title";
import { ForgetPasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Recuperar Senha",
};

export default function ForgetPassword(): JSX.Element {
  return (
    <AuthLayout>
      <AuthLayoutImage>teste</AuthLayoutImage>

      <AuthLayoutContent>
        <AuthTitle
          title="Recuperação de conta"
          description="Digite seu e-mail abaixo para recuperar sua conta"
          icon={UserIcon}
        />

        <ForgetPasswordForm />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex gap-1">
            <span className="text-sm text-slate-500">
              Não possuí uma conta?
            </span>
            <AuthLink title="Crie uma grátis" href="/sign-up" />
          </div>

          <Separator className="w-36" />

          <div className="flex gap-1">
            <span className="text-sm text-slate-500">Voltar para o</span>
            <AuthLink title="Log In" href="/sign-in" />
          </div>
        </div>
      </AuthLayoutContent>
    </AuthLayout>
  );
}
