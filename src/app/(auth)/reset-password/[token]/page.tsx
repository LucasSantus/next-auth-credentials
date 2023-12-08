import { authOptions } from "@/lib/auth";
import { User, VerificationToken } from "@prisma/client";
import { KeyRound } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthTitle } from "../../_components/auth-title";
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

export default async function ResetPassword({ params }: ForgetPasswordProps) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  const verificationToken = await getVerifyToken({ params });

  if (!verificationToken || !verificationToken?.user.email) {
    return (
      <div className="grid gap-4">
        <AuthTitle
          title="Recuperação de conta"
          description="Tivemos problemas ao tentar recuperar seus dados."
          icon={KeyRound}
        />

        <span>E-mail de usuário não foi encontrado!</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <AuthTitle
        title="Recuperação de conta"
        description="Digite os dados abaixo para resetar sua senha."
        icon={KeyRound}
      />

      <ResetPasswordForm email={verificationToken.user.email} />
    </div>
  );
}
