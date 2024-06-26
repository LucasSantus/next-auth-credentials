"use client";

import { Button } from "@/components/ui/button";
import { ErrorHandlingData } from "@/types/error-handling";
import { RefreshCcwIcon } from "lucide-react";
import { useEffect } from "react";

export default function ErrorHandling({ error, reset }: ErrorHandlingData) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const errorMessage = error?.message ?? "Ocorreu um erro inesperado!";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <h2 className="text-center text-sm font-medium text-red-600">
        {errorMessage}
      </h2>
      <Button
        onClick={() => reset()}
        icon={<RefreshCcwIcon className="size-4" />}
      >
        Tentar Novamente
      </Button>
    </div>
  );
}
