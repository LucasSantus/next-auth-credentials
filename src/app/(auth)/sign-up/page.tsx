import { KeyRoundIcon } from "lucide-react";
import { Metadata } from "next";
import { Fragment } from "react";
import { AlreadyAccount } from "../_components/already-account";
import { AuthenticationDescription } from "../_components/authentication-description";
import { SignUpForm } from "./form";

export const metadata: Metadata = {
  title: "New User",
};

export default function SignUpPage(): JSX.Element {
  return (
    <Fragment>
      <AuthenticationDescription
        title="Crie sua conta"
        description="Insira os dados abaixo para criar sua nova conta"
        icon={KeyRoundIcon}
      />

      <SignUpForm />

      <AlreadyAccount />
    </Fragment>
  );
}
