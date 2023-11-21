import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NewCategoryForm } from "./modules/new-category-form";

export default async function NewCategory() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Acesso Negado!</h2>
        <p className="text-sm opacity-60">Faça login para ver seus pedidos</p>
      </div>
    );
  }

  return (
    <main className="w-full text-white">
      <div className="mx-auto p-4 pt-20 sm:max-w-xl md:max-w-3xl xl:max-w-5xl">
        <div className="grid gap-6">
          <span className="text-2xl font-bold">Lista de Tarefas</span>

          <NewCategoryForm session={session} />
        </div>
      </div>
    </main>
  );
}
