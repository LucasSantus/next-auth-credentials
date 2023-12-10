import { PropsWithChildren } from "react";

interface AuthLayoutProps extends PropsWithChildren {}

function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2">{children}</div>
  );
}

interface AuthLayoutImageProps extends PropsWithChildren {}

function AuthLayoutImage({ children }: AuthLayoutImageProps): JSX.Element {
  return (
    <div className="hidden h-full items-center justify-center bg-zinc-900 p-10 text-white lg:grid">
      {children}
    </div>
  );
}

interface AuthLayoutContentProps extends PropsWithChildren {}

function AuthLayoutContent({ children }: AuthLayoutContentProps): JSX.Element {
  return (
    <div className="flex items-start justify-center bg-white py-5 sm:items-center lg:p-8">
      <div className="container max-w-md">
        <div className="grid gap-4">{children}</div>
      </div>
    </div>
  );
}

export { AuthLayout, AuthLayoutContent, AuthLayoutImage };
