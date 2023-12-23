import { USER_NOT_FOUND } from "@/constants/form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { SettingsHeader } from "../_components/settings-header";
import { SettingsLayout } from "../_components/settings-layout";
import { ProfileForm } from "./profile-form";

export default async function SettingsAccountPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return (
      <SettingsLayout
        title="Conta"
        description="Atualize as configurações da sua conta."
      >
        <span className="flex items-center justify-center text-foreground">
          {USER_NOT_FOUND}
        </span>
      </SettingsLayout>
    );

  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Conta"
        description="Atualize as configurações da sua conta."
      />
      <ProfileForm id={session.user.id} />

      <SettingsHeader
        title="Alteração de Senha"
        description="Atualize as configurações para autenticação no sistema."
      />
    </div>
  );
}
