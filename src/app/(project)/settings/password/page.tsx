import { USER_NOT_FOUND } from "@/constants/form";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { SettingsLayout } from "../_components/settings-layout";
import { ChangePasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Senha",
};

export default async function SettingsPasswordPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email)
    return (
      <SettingsLayout
        title="Chave"
        description="Atualize as configurações para autenticação no sistema."
      >
        <span className="flex items-center justify-center text-foreground">
          {USER_NOT_FOUND}
        </span>
      </SettingsLayout>
    );

  return (
    <SettingsLayout
      title="Chave"
      description="Atualize as configurações para autenticação no sistema."
    >
      <ChangePasswordForm email={session.user.email} />
    </SettingsLayout>
  );
}
