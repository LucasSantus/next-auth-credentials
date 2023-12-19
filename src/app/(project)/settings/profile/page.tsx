import { USER_NOT_FOUND } from "@/constants/form";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { SettingsLayout } from "../_components/settings-layout";
import { ProfileForm } from "./form";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return (
      <SettingsLayout
        title="Perfil"
        description="É assim que outras pessoas verão você no site."
      >
        <span className="flex items-center justify-center text-foreground">
          {USER_NOT_FOUND}
        </span>
      </SettingsLayout>
    );

  return (
    <SettingsLayout
      title="Perfil"
      description="É assim que outras pessoas verão você no site."
    >
      <ProfileForm id={session.user.id} />
    </SettingsLayout>
  );
}
