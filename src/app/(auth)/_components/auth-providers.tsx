import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Fragment } from "react";

interface AuthProvidersProps {
  isLoading: boolean;
}

export function AuthProviders({ isLoading }: AuthProvidersProps): JSX.Element {
  return (
    <Fragment>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2">OU CONTINUAR COM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
        <Button
          className="gap-2"
          disabled={isLoading}
          onClick={() => signIn("github")}
        >
          <GithubIcon size={15} />
        </Button>
        <Button
          className="gap-2"
          disabled={isLoading}
          onClick={() => signIn("google")}
        >
          <GithubIcon size={15} />
        </Button>
      </div>
    </Fragment>
  );
}
