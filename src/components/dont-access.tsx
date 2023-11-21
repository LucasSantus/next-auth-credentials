export function DontAccess(): JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
      <h2 className="font-bold">Acesso Negado!</h2>
      <p className="text-sm opacity-60">Faça login para ver seus dados!</p>
    </div>
  );
}
