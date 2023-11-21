import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { ButtonList } from "./list-providers";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return (
    <>
      <ButtonList providers={providers} />
    </>
  );
}
