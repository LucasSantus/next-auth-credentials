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
import { LogOut, User } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {
  session: Session | null;
}

export function Header({ session }: HeaderProps): JSX.Element {
  function userInitialLetters(session: Session) {
    if (session.user.name) {
      const name = session.user.name.split(" ");
      const firstName = name[0][0];
      const lastName = name[name.length - 1][0];
      return firstName + lastName;
    }
  }

  const hasSession = !session || !session.user;

  return (
    <header className="flex h-20 items-center justify-between">
      <Link href="/">
        <Button variant="link" className="p-0 text-white">
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
                {userInitialLetters(session)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
