import { LogInIcon } from "lucide-react";
import { Metadata } from "next";
import { AlreadyAccount } from "../_components/already-account";
import { AuthTitle } from "../_components/auth-title";
import { AuthenticationLayout } from "../_components/authentication-layout";
import { SignInForm } from "./form";

export const metadata: Metadata = {
  title: "Log In",
};

export default function SignIn(): JSX.Element {
  return (
    <AuthenticationLayout>
      <AuthTitle
        title="Log In"
        description="Insira os dados abaixo para fazer login em sua conta"
        icon={LogInIcon}
      />

      <SignInForm />

      <AlreadyAccount />
    </AuthenticationLayout>
  );
}
