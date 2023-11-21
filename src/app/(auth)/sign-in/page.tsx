import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NewUserForm } from "./form";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  return <NewUserForm />;
}
