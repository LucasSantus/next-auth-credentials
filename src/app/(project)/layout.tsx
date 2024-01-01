import { Framing } from "@/components/framer-motion/framing";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TRANSITION_DURATION } from "@/constants/globals";
import { authOptions } from "@/lib/auth";
import "@/styles/globals.css";
import "@/styles/reset.css";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { ReactNode } from "react";

interface GlobalProjectLayoutProps {
  children: ReactNode;
}

export default async function GlobalProjectLayout({
  children,
}: GlobalProjectLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/sign-in");

  return (
    <div className="container flex min-h-screen justify-center bg-background text-foreground">
      <div className="flex w-full flex-col space-y-3 p-3 sm:max-w-xl md:max-w-3xl xl:max-w-5xl">
        <Framing {...bounceHorizontalAnimation({})}>
          <Header session={session} />
        </Framing>

        <Framing
          as="main"
          className="flex-1"
          {...bounceHorizontalAnimation({ delay: TRANSITION_DURATION * 2 })}
        >
          {children}
        </Framing>

        <Framing
          {...bounceHorizontalAnimation({ delay: TRANSITION_DURATION * 3 })}
        >
          <Footer />
        </Framing>
      </div>
    </div>
  );
}
