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
import { cn } from "@/lib/utils";
import { SidebarItemsData } from "@/types/sidebar-items-type";
import { LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface HeaderProps {
  session: Session | null;
  items: SidebarItemsData[];
  shouldDisplaySidebar?: boolean;
}

export function Header({
  session,
  items,
  shouldDisplaySidebar = false,
}: HeaderProps): JSX.Element {
  const router = useCustomRouter();
  const isExpanded = true;

  const isAuthenticated = !!session && !!session.user;

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-background transition-all delay-150 duration-150 ease-out sm:static",
        shouldDisplaySidebar ? (isExpanded ? "sm:ml-64" : "sm:ml-20") : null,
      )}
    >
      <div className="container flex max-w-screen-2xl items-center justify-between">
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <MenuIcon className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full xs:max-w-xs"
            ></SheetContent>
          </Sheet>
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

{
  /* <header className="flex h-16 items-center border-b">
  <div className="container flex max-w-screen-2xl items-center justify-between p-4">
    <Link href="/">
      <Button variant="link" className="p-0 text-lg text-foreground">
        {PROJECT_NAME}
      </Button>
    </Link>
  </div>
</header>; */
}
