import Link, { LinkProps } from "next/link";

interface AuthenticationRedirectProps extends LinkProps {
  title: string;
}

export function AuthenticationRedirect({
  title,
  ...rest
}: AuthenticationRedirectProps): JSX.Element {
  return (
    <Link
      className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
      {...rest}
    >
      {title}
    </Link>
  );
}
