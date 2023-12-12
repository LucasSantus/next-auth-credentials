import { User, VerificationToken } from "@prisma/client";
import { KeyRound } from "lucide-react";
import { Metadata } from "next";
import { AuthenticationDescription } from "../../_components/authentication-description";
import { AuthenticationLayout } from "../../_components/authentication-layout";
import { ResetPasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Resetar Senha",
};

const getVerifyToken = async ({ params }: ForgetPasswordProps) => {
  const response = await fetch(
    process.env.NEXTAUTH_URL + "/api/auth/verify-token?token=" + params.token,
  ).then(
    async (response) =>
      (await response.json()) as {
        user: User;
        verificationToken: VerificationToken;
      },
  );

  return response;
};

interface ForgetPasswordProps {
  params: {
    token: string;
  };
}

export default async function ResetPassword({
  params,
}: ForgetPasswordProps): Promise<JSX.Element> {
  const verificationToken = await getVerifyToken({ params });

  if (!verificationToken || !verificationToken?.user.email) {
    return (
      <AuthenticationLayout>
        <AuthenticationDescription
          title="Recuperação de conta"
          description="Tivemos problemas ao tentar recuperar seus dados."
          icon={KeyRound}
        />

        <span>E-mail de usuário não foi encontrado!</span>
      </AuthenticationLayout>
    );
  }

  return (
    <AuthenticationLayout>
      <AuthenticationDescription
        title="Recuperação de conta"
        description="Digite os dados abaixo para resetar sua senha."
        icon={KeyRound}
      />

      <ResetPasswordForm email={verificationToken.user.email} />
    </AuthenticationLayout>
  );
}
