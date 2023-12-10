"use client";

import { MotionProps, motion } from "framer-motion";

type Element = "a" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";

type FramingProps = {
  as?: Element;
  className?: string;
};

export function Framing({
  as = "div",
  children,
  ...rest
}: FramingProps & MotionProps) {
  const Component = motion[as as Element] || motion.div;

  return <Component {...rest}>{children}</Component>;
}
