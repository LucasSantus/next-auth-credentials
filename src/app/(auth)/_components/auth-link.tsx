import Link from "next/link";

interface AuthLinkProps {
  title: string;
  href: string;
}

export function AuthLink({ title, href }: AuthLinkProps): JSX.Element {
  return (
    <Link
      href={href}
      className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
    >
      {title}
    </Link>
  );
}
