import { deleteUserByIdServer } from "@/actions/delete/delete-user-by-id";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useHelperSubmit } from "@/hooks/useHelperSubmit";
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

interface DeleteAccountProps {
  userId: string;
}

export function DeleteAccount({ userId }: DeleteAccountProps): JSX.Element {
  const { showToastBeforeSubmit } = useHelperSubmit();

  const { mutate, isPending } = useMutation({
    mutationKey: ["mutation-user-deleting-by-id", userId],
    mutationFn: async ({ userId }: DeleteAccountProps) =>
      await showToastBeforeSubmit({
        callback: async () => {
          await deleteUserByIdServer(userId);
          await signOut();
        },
        urlToRedirect: "/",
        message: {
          loading: "Deletando seu usuário...",
          success: "Sua conta foi deletada com sucesso!",
        },
      }),
    onError: () =>
      toast.error(
        "Não foi possível excluir sua conta. Tente novamente mais tarde.",
      ),
  });

  async function onHandleDeleteUser() {
    mutate({ userId });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          aria-label="delete user"
          isLoading={isPending}
          variant="destructive"
          icon={<Trash2Icon className="size-4" />}
        >
          Deletar Conta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar Conta</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar essa ação, sua conta será removida do sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Alert variant="destructive">
          <AlertDescription>
            Tem certeza absoluta de que pretende apagar a sua conta? Logo após a
            confirmação, não será possível recuperar a sua conta.
          </AlertDescription>
        </Alert>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Fechar</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onHandleDeleteUser}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
