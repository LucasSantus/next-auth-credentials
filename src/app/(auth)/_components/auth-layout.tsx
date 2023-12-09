import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface AuthLayoutProps extends PropsWithChildren {
  rowInverse?: boolean;
}

function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2">{children}</div>
  );
}

interface AuthLayoutImageProps extends PropsWithChildren {
  rowInverse?: boolean;
}

function AuthLayoutImage({ children }: AuthLayoutImageProps): JSX.Element {
  return (
    <div className="hidden h-full bg-zinc-900 p-10 text-white lg:grid">
      {children}
    </div>
  );
}

interface AuthLayoutContentProps extends PropsWithChildren {
  rowInverse?: boolean;
}

function AuthLayoutContent({
  children,
  rowInverse = false,
}: AuthLayoutContentProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex items-start justify-center bg-white py-5 sm:items-center lg:p-8",
        rowInverse && "order-first",
      )}
    >
      <div className="container max-w-md">
        <div className="grid gap-4">{children}</div>
      </div>
    </div>
  );
}

export { AuthLayout, AuthLayoutContent, AuthLayoutImage };
