import Link from "next/link";

interface AuthenticationRedirectProps {
  title: string;
  href: string;
}

export function AuthenticationRedirect({
  title,
  href,
}: AuthenticationRedirectProps): JSX.Element {
  return (
    <Link
      href={href}
      className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
    >
      {title}
    </Link>
  );
}
