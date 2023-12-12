import { LogInIcon } from "lucide-react";
import { Metadata } from "next";
import { AuthenticationDescription } from "../_components/authentication-description";
import { AuthenticationLayout } from "../_components/authentication-layout";
import { DontAlreadyAccount } from "../_components/dont-already-account";
import { SignInForm } from "./form";

export const metadata: Metadata = {
  title: "Log In",
};

export default function SignIn(): JSX.Element {
  return (
    <AuthenticationLayout>
      <AuthenticationDescription
        title="Log In"
        description="Insira os dados abaixo para fazer login em sua conta"
        icon={LogInIcon}
      />

      <SignInForm />

      <DontAlreadyAccount />
    </AuthenticationLayout>
  );
}
