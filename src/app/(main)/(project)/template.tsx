"use client";

import dynamic from "next/dynamic";
import { Fragment, ReactNode } from "react";

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
  return (
    <Fragment>
      <Joyride />

      {children}
    </Fragment>
  );
}
