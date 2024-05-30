import { RenderOnClient } from "@/components/render-on-client";
import { messages } from "@/constants/messages";
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

  const isAuthenticated = !!session && !!session.user;

  if (!isAuthenticated || !session.user.email)
    return (
      <SettingsLayout
        title="Chave"
        description="Atualize as configurações para autenticação no sistema."
      >
        <span className="flex items-center justify-center text-foreground">
          {messages.account.USER_NOT_FOUND}
        </span>
      </SettingsLayout>
    );

  return (
    <SettingsLayout
      title="Senha"
      description="Atualize as configurações para autenticação no sistema."
    >
      <RenderOnClient>
        <ChangePasswordForm email={session.user.email} />
      </RenderOnClient>
    </SettingsLayout>
  );
}
