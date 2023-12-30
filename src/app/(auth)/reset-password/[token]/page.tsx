import {
  VerifyTokenResponse,
  getVerifyTokenServer,
} from "@/actions/get/get-verify-token";
import { USER_NOT_FOUND } from "@/constants/form";
import { KeyRound } from "lucide-react";
import { Metadata } from "next";
import { AuthenticationDescription } from "../../_components/authentication-description";
import { AuthenticationLayout } from "../../_components/authentication-layout";
import { ResetPasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Resetar Senha",
};

const getVerifyToken = async ({
  params,
}: ForgetPasswordProps): Promise<VerifyTokenResponse | Error> => {
  try {
    const response = await getVerifyTokenServer(params.token);

    return response;
  } catch (error) {
    if (error instanceof Error) return error;

    return {} as VerifyTokenResponse;
  }
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

  if (verificationToken instanceof Error)
    return (
      <AuthenticationLayout>
        <AuthenticationDescription
          title="Recuperação de conta"
          description="Ops, houve um problema ao tentar acessar as informações!"
          icon={KeyRound}
        />

        <span className="text-center text-destructive">
          {verificationToken.message}
        </span>
      </AuthenticationLayout>
    );

  const isTokenVerified = !!verificationToken && !!verificationToken?.user;

  if (!isTokenVerified || !verificationToken?.user.email) {
    return (
      <AuthenticationLayout>
        <AuthenticationDescription
          title="Recuperação de conta"
          description="Ops, houve um problema ao tentar acessar as informações!"
          icon={KeyRound}
        />

        <span className="text-center">{USER_NOT_FOUND}</span>
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
