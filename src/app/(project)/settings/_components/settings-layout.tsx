import { Separator } from "@/components/ui/separator";
import { PropsWithChildren } from "react";

interface SettingsLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
}

export function SettingsLayout({
  title,
  description,
  children,
}: SettingsLayoutProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
}
