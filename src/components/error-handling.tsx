"use client";

import { Button } from "@/components/ui/button";
import { ErrorHandlingType } from "@/types/error-handling";
import { useEffect } from "react";

interface ErrorHandlingProps extends ErrorHandlingType {
  genericMessage?: boolean;
}

export default function ErrorHandling({
  genericMessage = true,
  error,
  reset,
}: ErrorHandlingProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <h2 className="text-center text-sm font-medium text-red-600">
        {genericMessage ? "Ocorreu um erro inesperado!" : error.message}
      </h2>
      <Button onClick={() => reset()}>Tentar Novamente</Button>
    </div>
  );
}
