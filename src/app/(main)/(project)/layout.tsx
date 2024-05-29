import { Framing } from "@/components/framer-motion/framing";
import { Header } from "@/components/layout/header";
import SideNav from "@/components/layout/sidenav";
import { TRANSITION_DURATION } from "@/constants/globals";
import { authOptions } from "@/lib/auth";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { headerItems } from "./_constants/header-items";

interface ProjectLayoutProps {
  children: ReactNode;
}

export default async function ProjectLayout({ children }: ProjectLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/sign-in");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <SideNav />

      <div className="flex flex-col">
        <Header session={session} items={headerItems} />
        <main className="flex-1">
          <Framing
            className="flex flex-1 flex-col"
            {...bounceHorizontalAnimation({
              delay: TRANSITION_DURATION * 2,
            })}
          >
            {children}
          </Framing>
        </main>
      </div>
    </div>
  );
}
