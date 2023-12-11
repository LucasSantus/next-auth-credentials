import { Footer } from "@/components/layout/footer";
import { Fragment, PropsWithChildren } from "react";

interface AuthenticationLayoutProps extends PropsWithChildren {}

export function AuthenticationLayout({
  children,
}: AuthenticationLayoutProps): JSX.Element {
  return (
    <Fragment>
      <div className="flex h-screen flex-col items-center justify-start bg-custom-gray-800 px-2 py-3 sm:justify-center">
        <div className="flex w-full max-w-md rounded-lg bg-white py-6 shadow-md lg:p-8">
          <div className="flex w-full flex-col gap-2">{children}</div>
        </div>

        <div className="pt-4 text-white md:hidden">
          <Footer />
        </div>
      </div>

      <div className="md:relative">
        <div className="p-3 text-white md:absolute md:bottom-0 md:left-0 md:right-0">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
