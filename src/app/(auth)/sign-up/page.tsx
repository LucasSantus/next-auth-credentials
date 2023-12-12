import { KeyRound } from "lucide-react";
import { Metadata } from "next";
import { AlreadyAccount } from "../_components/already-account";
import { AuthenticationDescription } from "../_components/authentication-description";
import { AuthenticationLayout } from "../_components/authentication-layout";
import { SignUpForm } from "./form";

export const metadata: Metadata = {
  title: "New User",
};

export default function SignUp(): JSX.Element {
  return (
    <AuthenticationLayout>
      <AuthenticationDescription
        title="Crie sua conta"
        description="Insira os dados abaixo para criar sua nova conta"
        icon={KeyRound}
      />

      <SignUpForm />

      <AlreadyAccount />
    </AuthenticationLayout>
  );
}
