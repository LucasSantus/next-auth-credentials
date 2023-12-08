import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden h-full bg-zinc-900 p-10 text-white lg:grid">
        teste
      </div>
      <div className="flex items-start justify-center bg-white py-5 sm:items-center lg:p-8">
        <div className="container max-w-md">{children}</div>
      </div>
    </div>
  );
}
