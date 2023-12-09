import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

interface GlobalAuthLayoutProps {
  children: ReactNode;
}

export default async function GlobalAuthLayout({
  children,
}: GlobalAuthLayoutProps) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <Fragment>{children}</Fragment>;
}
