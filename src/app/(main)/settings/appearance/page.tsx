import { RenderOnClient } from "@/components/render-on-client";
import { Metadata } from "next";
import { SettingsLayout } from "../_components/settings-layout";
import { AppearanceForm } from "./form";

export const metadata: Metadata = {
  title: "Aparência",
};

export default function SettingsAppearancePage() {
  return (
    <SettingsLayout
      title="Aparência"
      description="Personalize a aparência do sistema. Alterne entre os temas abaixo."
    >
      <RenderOnClient>
        <AppearanceForm />
      </RenderOnClient>
    </SettingsLayout>
  );
}
