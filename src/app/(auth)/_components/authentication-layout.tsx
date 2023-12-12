import { Footer } from "@/components/layout/footer";
import { Fragment, PropsWithChildren } from "react";

interface AuthenticationLayoutProps extends PropsWithChildren {}

export function AuthenticationLayout({
  children,
}: AuthenticationLayoutProps): JSX.Element {
  return (
    <Fragment>
      <div className="bg-background text-foreground flex h-screen flex-col items-center justify-start px-2 py-3 sm:justify-center">
        <div className="bg-card border-border flex w-full max-w-md rounded-lg border py-6 shadow-md lg:p-8">
          <div className="flex w-full flex-col gap-2">{children}</div>
        </div>

        <div className="pt-4 md:hidden">
          <Footer />
        </div>
      </div>

      <div className="md:relative">
        <div className="text-foreground p-3 md:absolute md:bottom-0 md:left-0 md:right-0">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
