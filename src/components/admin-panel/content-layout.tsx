import { Navbar } from "@/components/admin-panel/navbar";
import { Session } from "next-auth";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  session: Session | null;
}

export function ContentLayout({
  title,
  session,
  children,
}: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} session={session} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
}
