"use client";
import { usePathname, useSearchParams } from "next/navigation";
import * as NProgress from "nprogress";
import { useEffect } from "react";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
