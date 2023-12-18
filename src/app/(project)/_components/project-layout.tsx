import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

interface ProjectLayoutProps extends PropsWithChildren {
  session: Session | null;
}

export function ProjectLayout({
  children,
  session,
}: ProjectLayoutProps): JSX.Element {
  if (!session || !session.user) redirect("/sign-in");

  return (
    <div className="container flex min-h-screen justify-center bg-background text-foreground">
      <div className="flex w-full flex-col space-y-3 p-3 sm:max-w-xl md:max-w-3xl xl:max-w-5xl">
        <Header session={session} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
