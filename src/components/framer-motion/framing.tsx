"use client";

import { MotionProps, motion } from "framer-motion";

type MotionElement = keyof typeof motion;

type FramingProps = {
  as?: MotionElement;
  className?: string;
};

export function Framing({
  as: element = "div",
  children,
  ...rest
}: FramingProps & MotionProps) {
  const Component = motion[element as MotionElement] || motion.div;

  return <Component {...rest}>{children}</Component>;
}
