import { Framing } from "@/components/framer-motion/framing";
import { Footer } from "@/components/layout/footer";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { Fragment, PropsWithChildren } from "react";

interface AuthenticationLayoutProps extends PropsWithChildren {}

export function AuthenticationLayout({
  children,
}: AuthenticationLayoutProps): JSX.Element {
  return (
    <Fragment>
      <div className="flex h-screen flex-col items-center justify-start bg-background px-2 py-3 text-foreground sm:justify-center">
        <Framing
          className="flex w-full max-w-md rounded-lg border border-border bg-card p-4 shadow-md lg:p-8"
          {...bounceHorizontalAnimation({})}
        >
          <div className="flex w-full flex-col gap-2">{children}</div>
        </Framing>
        <div className="pt-4 md:hidden">
          <Framing {...bounceHorizontalAnimation({ delay: 1.3 })}>
            <Footer />
          </Framing>
        </div>
      </div>

      <div className="md:relative">
        <div className="p-3 text-foreground md:absolute md:bottom-0 md:left-0 md:right-0">
          <Framing {...bounceHorizontalAnimation({ delay: 1.3 })}>
            <Footer />
          </Framing>
        </div>
      </div>
    </Fragment>
  );
}
