import { PropsWithChildren } from "react";
import { SettingsHeader, SettingsHeaderProps } from "./settings-header";

interface SettingsLayoutProps extends PropsWithChildren, SettingsHeaderProps {}

export function SettingsLayout({
  children,
  ...rest
}: SettingsLayoutProps): JSX.Element {
  return (
    <div className="space-y-6">
      <SettingsHeader {...rest} />
      {children}
    </div>
  );
}
