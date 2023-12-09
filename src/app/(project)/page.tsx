import { ProjectLayout } from "@/layout/project-layout";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <ProjectLayout session={session}>
      <span className="text-2xl font-bold">Home</span>
    </ProjectLayout>
  );
}
