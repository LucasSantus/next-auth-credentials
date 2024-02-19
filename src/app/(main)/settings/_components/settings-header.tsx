import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

export interface SettingsHeaderProps {
  title: string;
  description: string;
}

export function SettingsHeader({
  title,
  description,
}: SettingsHeaderProps): JSX.Element {
  return (
    <Fragment>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
    </Fragment>
  );
}
