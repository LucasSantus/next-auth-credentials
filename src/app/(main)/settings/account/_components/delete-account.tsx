import { deleteUserByIdServer } from "@/actions/delete/delete-user-by-id";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ICON_SIZE } from "@/constants/globals";
import { useHelperSubmit } from "@/hooks/useHelperSubmit";
import { Trash2Icon, XCircleIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface DeleteAccountProps {
  id: string;
}

export function DeleteAccount({ id }: DeleteAccountProps): JSX.Element {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { showToastBeforeSubmit } = useHelperSubmit();

  async function onHandleDeleteUser() {
    setIsDeleting(true);
    await showToastBeforeSubmit({
      callback: async () => {
        await deleteUserByIdServer(id);
        await signOut();
      },
      urlToRedirect: "/",
      message: {
        loading: "Deletando o usuário",
        success: "Usuário foi deletado com sucesso!",
      },
    });
    setIsDeleting(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          aria-label="delete user"
          isLoading={isDeleting}
          variant="destructive"
          icon={<Trash2Icon className={ICON_SIZE} />}
        >
          Deletar Conta
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card p-7">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <XCircleIcon size={80} className="text-destructive" />

          <span className="text-3xl font-semibold text-foreground">
            Tem certeza?
          </span>
          <span className="text-muted-foreground">
            Você realmente deseja excluir esses registros? Este processo não
            pode ser desfeito.
          </span>
        </div>

        <Button
          type="button"
          aria-label="delete user"
          variant="destructive"
          isLoading={isDeleting}
          onClick={onHandleDeleteUser}
          icon={<Trash2Icon className={ICON_SIZE} />}
        >
          Deletar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
