import { SettingsLayout } from "../_components/settings-layout";
import { AppearanceForm } from "./form";

export default function SettingsAppearancePage() {
  return (
    <SettingsLayout
      title="Aparência"
      description="Personalize a aparência do sistema. Alterne entre os temas abaixo."
    >
      <AppearanceForm />
    </SettingsLayout>
  );
}
