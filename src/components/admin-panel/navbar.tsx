"use client";

import { headerItems } from "@/app/(main)/(protected)/_constants/header-items";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface NavbarProps {
  title: string;
  session: Session | null;
}

export function Navbar({ title, session }: NavbarProps) {
  const router = useCustomRouter();
  const isAuthenticated = !!session && !!session.user;

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>

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
                {headerItems.map(({ href, icon, title }) => (
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
                <LogOutIcon className="size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
