import Link, { LinkProps } from "next/link";

interface AuthenticationLinkProps extends LinkProps {
  title: string;
}

export function AuthenticationLink({
  title,
  ...rest
}: AuthenticationLinkProps): JSX.Element {
  return (
    <Link
      className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
      {...rest}
    >
      {title}
    </Link>
  );
}
