"use client";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <NextTopLoader height={4} showSpinner={false} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {children}
    </SessionProvider>
  );
}
