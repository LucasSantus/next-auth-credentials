import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter as useNextRouter, usePathname } from "next/navigation";
import * as NProgress from "nprogress";
import { useCallback } from "react";

export function useCustomRouter(): ReturnType<typeof useNextRouter> {
  const router = useNextRouter();
  const pathname = usePathname();

  const replace = useCallback(
    (href: string, options?: NavigateOptions) => {
      href !== pathname && NProgress.start();
      router.replace(href, options);
    },
    [router, pathname],
  );

  const push = useCallback(
    (href: string, options?: NavigateOptions) => {
      href !== pathname && NProgress.start();
      router.push(href, options);
    },
    [router, pathname],
  );

  const back = useCallback(
    () => {
      router.back();
    },
    [router, pathname],
  );

  return {
    ...router,
    back,
    replace,
    push,
  };
}
