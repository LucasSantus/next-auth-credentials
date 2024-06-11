import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Navbar } from "./layout/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export async function ContentLayout({ title, children }: ContentLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar title={title} session={session} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
}
