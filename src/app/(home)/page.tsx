import { DontAccess } from "@/components/dont-access";
import { Button } from "@/components/ui/button";
import { ProjectLayout } from "@/layout/project-layout";
import { authOptions } from "@/lib/auth";
import { BadgePlus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <ProjectLayout session={session}>
        <DontAccess />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout session={session}>
      <div className="grid gap-6">
        <span className="text-2xl font-bold">Lista de Tarefas</span>

        <Link href="/category/new">
          <Button variant="ghost" size="icon">
            <BadgePlus />
          </Button>
        </Link>

        {/* <div className="flex w-full justify-center">
            <Todos />
          </div> */}
      </div>
    </ProjectLayout>
  );
}
