import {
  VerifyTokenResponse,
  getActionVerifyToken,
} from "@/actions/get/get-verify-token";
import { KeyRound } from "lucide-react";
import { Metadata } from "next";
import { toast } from "react-toastify";
import { AuthenticationDescription } from "../../_components/authentication-description";
import { AuthenticationLayout } from "../../_components/authentication-layout";
import { ResetPasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Resetar Senha",
};

const getData = async ({
  params,
}: ForgetPasswordProps): Promise<VerifyTokenResponse> => {
  try {
    return await getActionVerifyToken(params.token);
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);

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
  const verificationToken = await getData({ params });

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
