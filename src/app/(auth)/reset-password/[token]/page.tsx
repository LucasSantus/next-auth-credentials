import { authOptions } from "@/lib/auth";
import { User, VerificationToken } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthTitle } from "../../_components/auth-title";
import { ResetPasswordForm } from "./form";

interface ForgetPasswordProps {
  params: {
    token: string;
  };
}

const getVerifyToken = async ({ params }: ForgetPasswordProps) => {
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
};

export default async function ResetPassword({ params }: ForgetPasswordProps) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  const verificationToken = await getVerifyToken({ params });

  if (verificationToken instanceof Error) {
    console.log(verificationToken);

    return (
      <div className="grid gap-4">
        <AuthTitle
          title="Recuperação de conta"
          description="Digite seu e-mail abaixo para recuperar sua conta"
        />

        <span>tete</span>
      </div>
    );
  }

  if (!verificationToken || !verificationToken?.user.email) {
    return (
      <div className="grid gap-4">
        <AuthTitle
          title="Recuperação de conta"
          description="Digite seu e-mail abaixo para recuperar sua conta"
        />

        <span>E-mail de usuário não foi encontrado!</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <AuthTitle
        title="Recuperação de conta"
        description="Digite seu e-mail abaixo para recuperar sua conta"
      />

      <ResetPasswordForm email={verificationToken.user.email} />
    </div>
  );
}
