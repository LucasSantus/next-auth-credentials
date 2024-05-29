import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import nProgress from "nprogress";

interface NavigationProps {}

export function Navigation({}: NavigationProps): JSX.Element | null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    nProgress.done();
  }, [pathname, searchParams]);

  return null;
}
