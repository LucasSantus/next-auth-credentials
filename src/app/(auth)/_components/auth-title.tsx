interface AuthTitleProps {
  title: string;
  description: string;
}

export function AuthTitle({ title, description }: AuthTitleProps): JSX.Element {
  return (
    <div className="grid gap-1 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}
