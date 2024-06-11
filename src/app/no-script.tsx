"use client";

export function NoScript(): JSX.Element {
  return (
    <noscript>
      <style type="text/css">
        {`
        * {
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        #root, #main-layout {
          display: none;
        }
      `}
      </style>
      <div className="grid h-screen w-screen scroll-smooth bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
            Ativar JavaScript
          </h1>
          <p className="mx-auto max-w-prose text-muted-foreground md:text-xl/relaxed">
            Este síte requer JavaScript para funcionar corretamente. Por favor,
            ative o JavaScript no seu browser e atualize a página.
          </p>
        </div>
      </div>
    </noscript>
  );
}
