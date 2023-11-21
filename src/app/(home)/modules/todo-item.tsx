"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

interface TodoItemProps {}

export function TodoItem({}: TodoItemProps): JSX.Element {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-3 sm:px-8 sm:py-4",
        isCompleted ? "bg-custom-gray-700/60" : "bg-custom-gray-700 shadow-sm",
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          id="is-completed"
          checked={isCompleted}
          onCheckedChange={() =>
            setIsCompleted((currentValue) => !currentValue)
          }
        />

        <div className="grid sm:pe-12">
          <span
            className={cn(
              "text-sm font-bold text-custom-gray-200",
              isCompleted && "line-through",
            )}
          >
            Maca
          </span>

          <span
            className={cn(
              "truncate text-xs font-medium text-custom-gray-400",
              isCompleted && "line-through",
            )}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
            corporis repellendus consectetur non commodi nostrum nesciunt
            reprehenderit harum aliquid, ipsum ab reiciendis tenetur molestias
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge className="hidden sm:block">Fluta</Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Billing</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
