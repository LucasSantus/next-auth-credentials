"use client";

import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { PropsWithChildren, Suspense, useState } from "react";
import { NoScript } from "./no-script";
import { Navigation } from "./navigation";

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => {
    return new QueryClient();
  });

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

            <Suspense fallback={null}>
              <Navigation />
            </Suspense>

            {children}
          </ThemeProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
