import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BugIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center text-center">
      <div className="space-y-3">
        <BugIcon className="inline-block size-16" />
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-7xl">
          404 Página não encontrada
        </h1>
        <h3 className="text-lg font-medium tracking-tighter md:text-xl lg:text-2xl">
          Uh oh! Esta página não existe.
        </h3>
        <p className="mx-auto max-w-lg px-2 text-muted-foreground">
          Acertou numa rota que não existe. O melhor curso de ação é dar meia
          volta e regressar a um local seguro.
        </p>
        <Link
          className={cn(
            buttonVariants({
              variant: "default",
              size: "default",
              className: "!text-primary-foreground",
            }),
          )}
          href="/"
        >
          Ir para Dashboard
        </Link>
      </div>
    </main>
  );
}
