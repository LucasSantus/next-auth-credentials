"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PROJECT_NAME } from "@/constants/config";
import { ICON_SIZE } from "@/constants/globals";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { SidebarItemsType } from "@/types/sidebar-items-type";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {
  session: Session | null;
  items: SidebarItemsType[];
}

export function Header({ session, items }: HeaderProps): JSX.Element {
  const router = useCustomRouter();

  const isAuthenticated = !!session && !!session.user;

  return (
    <header className="flex h-16 items-center border-b">
      <div className="container flex max-w-screen-2xl items-center justify-between p-4">
        <Link href="/">
          <Button variant="link" className="p-0 text-lg text-foreground">
            {PROJECT_NAME}
          </Button>
        </Link>

        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  className="cursor-pointer select-none"
                  src={session.user.image ?? ""}
                />
                <AvatarFallback className="cursor-pointer">
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                {session.user.name ?? "Minha Conta"}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {items.map(({ href, icon, title }) => (
                  <DropdownMenuItem
                    key={href}
                    onClick={() => router.push(href)}
                    className="space-x-2"
                  >
                    {icon}
                    <span>{title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="space-x-2">
                <LogOutIcon className={ICON_SIZE} />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
