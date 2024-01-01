import { LogInIcon } from "lucide-react";
import { Metadata } from "next";
import { Fragment } from "react";
import { AuthenticationDescription } from "../_components/authentication-description";
import { DontAlreadyAccount } from "../_components/dont-already-account";
import { SignInForm } from "./form";

export const metadata: Metadata = {
  title: "Log In",
};

export default function SignIn(): JSX.Element {
  return (
    <Fragment>
      <AuthenticationDescription
        title="Log In"
        description="Insira os dados abaixo para fazer login em sua conta"
        icon={LogInIcon}
      />

      <SignInForm />

      <DontAlreadyAccount />
    </Fragment>
  );
}
