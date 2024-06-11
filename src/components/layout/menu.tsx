"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/constants/menu-list";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { useHelperSubmit } from "@/hooks/use-helper-submit";
import { cn } from "@/lib/utils";
import { Ellipsis, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { CollapseMenuButton } from "./sidebar/sidebar-collapse-button";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const router = useCustomRouter();
  const { isRedirecting, showToastBeforeSubmit } = useHelperSubmit();

  function onHandleLogout() {
    showToastBeforeSubmit({
      urlToRedirect: "/sign-in",
      message: {
        loading: "Desconectando...",
        success: "Usuário desconectado da plataforma!",
      },
      callback: () => signOut(),
    });
  }

  return (
    <ScrollArea className="px-3 [&>div>div[style]]:!block">
      <nav className="mt-2 h-full w-full">
        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px-40px)] flex-col items-start space-y-1 lg:min-h-[calc(100vh-32px-40px-32px-40px)]">
          {menuOptions.map(({ label, options }, index) => (
            <li className={cn("w-full", label ? "pt-5" : "")} key={index}>
              {(isOpen && label) || isOpen === undefined ? (
                <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                  {label}
                </p>
              ) : !isOpen && isOpen !== undefined && label ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="flex w-full items-center justify-center">
                        <Ellipsis className="size-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2" />
              )}

              {options.map(({ href, label, icon: Icon, subOptions }, index) =>
                subOptions?.length ? (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      subOptions={subOptions}
                      icon={Icon}
                      label={label}
                      active={pathname.includes(href)}
                      isOpen={isOpen}
                    />
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={
                              pathname.includes(href) ? "secondary" : "ghost"
                            }
                            size={isOpen ? "default" : "icon"}
                            onClick={() => router.push(href)}
                            icon={<Icon className="size-4" />}
                            className={cn(
                              "my-1 w-full",
                              isOpen ? "justify-start" : "justify-center",
                            )}
                          >
                            <span
                              className={cn("truncate", !isOpen && "hidden")}
                            >
                              {label}
                            </span>
                          </Button>
                        </TooltipTrigger>

                        {!isOpen && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ),
              )}
            </li>
          ))}
        </ul>

        <ul>
          <li className="flex w-full items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onHandleLogout}
                    variant="outline"
                    size={isOpen ? "default" : "icon"}
                    icon={<LogOut className="size-4" />}
                    className="w-full justify-center"
                    isLoading={isRedirecting}
                  >
                    <span className={cn(!isOpen && "hidden")}>Sign out</span>
                  </Button>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
