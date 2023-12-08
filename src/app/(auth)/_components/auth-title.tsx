import { LucideIcon } from "lucide-react";

interface AuthTitleProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function AuthTitle({
  title,
  description,
  icon: Icon,
}: AuthTitleProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center">
      <div className="flex items-center justify-center gap-2">
        <Icon className="h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      </div>

      <span className="text-sm text-slate-500">{description}</span>
    </div>
  );
}
