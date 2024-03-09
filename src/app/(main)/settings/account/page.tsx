import { RenderOnClient } from "@/components/render-on-client";

import { messages } from "@/constants/globals";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { SettingsLayout } from "../_components/settings-layout";
import { ProfileForm } from "./form";

export const metadata: Metadata = {
  title: "Conta",
};

export default async function SettingsAccountPage() {
  const session = await getServerSession(authOptions);

  const isAuthenticated = !!session && !!session.user;

  if (!isAuthenticated || !session.user.email)
    return (
      <SettingsLayout
        title="Conta"
        description="Atualize as configurações da sua conta."
      >
        <span className="flex items-center justify-center text-foreground">
          {messages.account.USER_NOT_FOUND}
        </span>
      </SettingsLayout>
    );

  return (
    <SettingsLayout
      title="Conta"
      description="Atualize as configurações da sua conta."
    >
      <RenderOnClient>
        <ProfileForm id={session.user.id} />
      </RenderOnClient>
    </SettingsLayout>
  );
}
