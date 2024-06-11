import { Separator } from "@/components/ui/separator";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import { Fragment } from "react";
import { AuthenticationDescription } from "../_components/authentication-description";
import { AuthenticationLink } from "../_components/authentication-redirect";
import { DontAlreadyAccount } from "../_components/dont-already-account";
import { ForgetPasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Recuperar Senha",
};

export default function ForgetPassword(): JSX.Element {
  return (
    <Fragment>
      <AuthenticationDescription
        title="Recuperação de conta"
        description="Digite seu e-mail abaixo para recuperar sua conta"
        icon={UserIcon}
      />

      <ForgetPasswordForm />

      <div className="flex flex-col items-center justify-center gap-3 pt-2">
        <DontAlreadyAccount />

        <Separator className="w-36" />

        <div className="flex gap-1">
          <span className="text-sm text-muted-foreground">Voltar para o</span>
          <AuthenticationLink title="Log In" href="/sign-in" />
        </div>
      </div>
    </Fragment>
  );
}
