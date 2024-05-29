"use client";

import { Framing } from "@/components/framer-motion/framing";
import { TRANSITION_DURATION } from "@/constants/globals";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

interface ProjectTemplateProps {
  children: ReactNode;
}

const Joyride = dynamic(
  () => import("../../../components/joyride").then(({ Joyride }) => Joyride),
  {
    ssr: false,
  },
);

export default function ProjectTemplate({ children }: ProjectTemplateProps) {
  const { isActive } = useSidebar();

  return (
    <div
      className={cn(
        "p-5 transition-all delay-300 duration-300 ease-out",
        isActive ? "sm:ml-64" : "sm:ml-20",
      )}
    >
      <Framing
        {...bounceHorizontalAnimation({
          delay: TRANSITION_DURATION,
          positioning: 0,
        })}
        className="bg-white"
      >
        <Joyride />

        {children}
      </Framing>
    </div>
  );
}
