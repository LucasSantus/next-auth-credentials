import { Session } from "next-auth";
import { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

interface ProjectLayoutProps extends PropsWithChildren {
  session: Session | null;
}

export function ProjectLayout({
  children,
  session,
}: ProjectLayoutProps): JSX.Element {
  return (
    <div className="container flex min-h-screen justify-center text-white">
      <div className="flex w-full flex-col space-y-3 p-3 sm:max-w-xl md:max-w-3xl xl:max-w-5xl">
        <Header session={session} />

        <div className="flex-1">{children}</div>

        <Footer />
      </div>
    </div>
  );
}
