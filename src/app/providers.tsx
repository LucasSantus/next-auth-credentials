"use client";

import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { usePathname, useSearchParams } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import nProgress from "nprogress";
import { PropsWithChildren, useEffect, useState } from "react";
import { NoScript } from "./no-script";

export function Providers({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [queryClient] = useState(() => {
    return new QueryClient();
  });

  useEffect(() => {
    nProgress.done();
  }, [pathname, searchParams]);

  return (
    <SessionProvider refetchOnWindowFocus>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <NoScript />

            <NextTopLoader
              color="#2299DD"
              initialPosition={0.1}
              crawlSpeed={200}
              height={3}
              speed={200}
              zIndex={9999}
              showAtBottom={false}
              crawl
              showSpinner
            />

            <Toaster duration={4000} richColors closeButton visibleToasts={9} />

            {children}
          </ThemeProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
