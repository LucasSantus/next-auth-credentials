import { LucideIcon } from "lucide-react";

interface AuthenticationDescriptionProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function AuthenticationDescription({
  title,
  description,
  icon: Icon,
}: AuthenticationDescriptionProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center">
      <div className="flex items-center justify-center gap-2">
        <Icon className="h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      </div>

      <span className="text-muted-foreground text-sm">{description}</span>
    </div>
  );
}
