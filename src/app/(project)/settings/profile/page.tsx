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

  return (
    <SettingsLayout
      title="Perfil"
      description="É assim que outras pessoas verão você no site."
    >
      <ProfileForm session={session} />
    </SettingsLayout>
  );
}
