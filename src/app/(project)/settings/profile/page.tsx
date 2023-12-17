import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { ProfileFormData } from "@/validation/settings/profile";
import { getServerSession } from "next-auth";
import { ProfileForm } from "./form";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const defaultValues: ProfileFormData = {
    name: session?.user.name ?? "",
    email: session?.user.email ?? "",
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          É assim que outras pessoas verão você no site.
        </p>
      </div>
      <Separator />
      <ProfileForm defaultValues={defaultValues} />
    </div>
  );
}
