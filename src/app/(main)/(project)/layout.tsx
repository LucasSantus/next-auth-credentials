import { Framing } from "@/components/framer-motion/framing";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import SideNav from "@/components/layout/sidenav";
import { TRANSITION_DURATION } from "@/constants/globals";
import { authOptions } from "@/lib/auth";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ProjectTemplateProps {
  children: ReactNode;
}

export default async function ProjectTemplate({
  children,
}: ProjectTemplateProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/sign-in");

  return (
    <div className="flex">
      <SideNav />

      <main className="flex-grow">
        <div className="flex min-h-screen text-foreground">
          <div className="flex w-full flex-col">
            <Header session={session} />

            <div className="container flex max-w-screen-2xl flex-1 flex-col p-4">
              <Framing
                className="flex-1"
                {...bounceHorizontalAnimation({
                  delay: TRANSITION_DURATION * 2,
                })}
              >
                {children}
              </Framing>

              <Framing
                {...bounceHorizontalAnimation({
                  delay: TRANSITION_DURATION * 3,
                })}
              >
                <Footer />
              </Framing>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
