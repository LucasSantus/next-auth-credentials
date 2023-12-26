import { useRouter as useNextRouter } from "next/navigation";
import * as NProgress from "nprogress";

export function useCustomRouter(): ReturnType<typeof useNextRouter> {
  const router = useNextRouter();

  return {
    ...router,
    push: (href, options) => {
      NProgress.start();
      router.push(href, options);
    },
    back: () => {
      NProgress.start();
      router.back();
    },
  };
}
