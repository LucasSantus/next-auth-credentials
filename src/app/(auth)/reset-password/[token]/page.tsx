import { getVerifyTokenServer } from "@/actions/get/get-verify-token";
import { KeyRoundIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { AuthenticationDescription } from "../../_components/authentication-description";
import { ResetPasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Resetar Senha",
};

interface ForgetPasswordProps {
  params: {
    token: string;
  };
}

export default async function ResetPassword({
  params,
}: ForgetPasswordProps): Promise<JSX.Element> {
  const { user } = await getVerifyTokenServer(params.token);

  if (!user || !user?.email) return notFound();

  return (
    <Fragment>
      <AuthenticationDescription
        title="Recuperação de conta"
        description="Digite os dados abaixo para resetar sua senha."
        icon={KeyRoundIcon}
      />

      <ResetPasswordForm email={user.email} />
    </Fragment>
  );
}
