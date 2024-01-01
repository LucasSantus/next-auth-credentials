import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";

import { getServerSession } from "next-auth";

interface AuthenticatedResponse {
  isAuthenticated: boolean;
  session: Session;
}

export async function isSessionAuthenticated(): Promise<AuthenticatedResponse> {
  const session = await getServerSession(authOptions);

  const isSession = !!session && !!session.user;

  const isAuthenticated = !isSession || !session.user.email;

  return {
    isAuthenticated: !isAuthenticated,
    session: session ?? ({} as Session),
  };
}
