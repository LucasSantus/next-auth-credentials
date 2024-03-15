import { messages } from "@/constants/globals";
import { toast } from "sonner";
import { useCustomRouter } from "./useCustomRouter";
interface ToastBeforeSubmitProps {
  message?: {
    loading?: string;
    success?: string;
  };
  callback: () => void;
  urlToRedirect?: string;
  showMessageYouAreRedirected?: boolean;
}

interface HelperSubmitResponse {
  showToastBeforeSubmit: (props: ToastBeforeSubmitProps) => void;
}

export function useHelperSubmit(): HelperSubmitResponse {
  const router = useCustomRouter();

  async function showToastBeforeSubmit({
    message,
    callback,
    urlToRedirect,
    showMessageYouAreRedirected = true,
  }: ToastBeforeSubmitProps) {
    const toastId = toast.loading(
      message?.loading ?? messages.form.STORING_INFORMATION,
    );

    try {
      await callback();

      toast.success(message?.success ?? messages.form.DATA_HAS_BEEN_UPDATED, {
        id: toastId,
      });

      if (showMessageYouAreRedirected)
        toast.info(messages.globals.YOU_ARE_BEING_REDIRECTED, {
          duration: 1000,
        });

      await new Promise((resolve) =>
        setTimeout(async () => {
          if (urlToRedirect) {
            await router.push(urlToRedirect);
          } else {
            router.refresh();
          }

          resolve(null);
        }, 1500),
      );
    } catch (error) {
      const toastOptions = {
        id: toastId,
        duration: 5000,
      };

      if (error instanceof Error) {
        if (error.message.includes("connect with the database")) {
          toast.error(
            "Ocorreu um problema ao tentar conectar ao banco de dados. Por favor, tente novamente mais tarde.",
            toastOptions,
          );
        } else if (error.message.includes("timeout")) {
          toast.error(
            "Ocorreu um problema ao tentar conectar ao banco de dados. O Tempo limite de conexão expirou.",
            toastOptions,
          );
        } else if (error.message.includes("password authentication failed")) {
          toast.error(
            "Não foi possível se conectar ao banco dados, revalide os dados da conexão.",
            toastOptions,
          );
        } else {
          toast.error(error.message, toastOptions);
        }
      }
    }
  }

  return { showToastBeforeSubmit };
}
