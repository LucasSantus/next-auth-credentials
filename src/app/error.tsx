"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GlobalErrorHandling({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-center text-sm font-medium text-red-600">
        Ocorreu um erro inesperado!
      </h2>
      <Button onClick={() => reset()}>Tentar Novamente</Button>
    </div>
  );
}
