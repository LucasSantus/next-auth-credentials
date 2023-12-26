import "@/styles/globals.css";
import "@/styles/reset.css";

import { PROJECT_NAME } from "@/constants/config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { NoScript } from "./no-script";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: PROJECT_NAME,
    template: "%s | " + PROJECT_NAME,
  },
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn("min-h-screen", inter.className)}
      >
        <Providers>
          <NoScript />
          {children}
        </Providers>
      </body>
    </html>
  );
}
