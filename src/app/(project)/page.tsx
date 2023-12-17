import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ProjectLayout } from "./_components/project-layout";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <ProjectLayout session={session}>
      <span className="text-2xl font-bold">Home</span>
    </ProjectLayout>
  );
}
