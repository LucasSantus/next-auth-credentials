import { KeyRound } from "lucide-react";
import { Metadata } from "next";
import { AlreadyAccount } from "../_components/already-account";
import { AuthTitle } from "../_components/auth-title";
import { AuthenticationLayout } from "../_components/authentication-layout";
import { SignUpForm } from "./form";

export const metadata: Metadata = {
  title: "New User",
};

export default function SignUp(): JSX.Element {
  return (
    <AuthenticationLayout>
      <AuthTitle
        title="Crie sua conta"
        description="Insira os dados abaixo para criar sua nova conta"
        icon={KeyRound}
      />

      <SignUpForm />

      <AlreadyAccount />
    </AuthenticationLayout>
  );
}
