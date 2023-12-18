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
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {
  session: Session | null;
}

export function Header({ session }: HeaderProps): JSX.Element {
  const router = useCustomRouter();

  const hasSession = !session || !session.user;

  return (
    <header className="flex h-20 items-center justify-between">
      <Link href="/">
        <Button variant="link" className="p-0 text-lg text-foreground">
          Todo List
        </Button>
      </Link>

      {!hasSession && (
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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push("/settings/profile")}
              >
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
