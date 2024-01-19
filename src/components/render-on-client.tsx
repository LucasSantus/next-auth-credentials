"use client";

import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { Loader } from "./loader";

interface RenderOnClientProps extends PropsWithChildren {}

export function RenderOnClient({ children }: RenderOnClientProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <Fragment>{isClient ? children : <Loader />}</Fragment>;
}
