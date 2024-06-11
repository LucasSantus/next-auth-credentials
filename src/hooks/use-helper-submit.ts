import { messages } from "@/constants/messages";
import { useTransition } from "react";
import { toast } from "sonner";
import { useCustomRouter } from "./use-custom-router";

interface ToastBeforeSubmitProps {
  message?: {
    loading?: string;
    success?: string;
  };
  callback: () => void;
  urlToRedirect?: string;
}

interface HelperSubmitResponse {
  isRedirecting: boolean;
  showToastBeforeSubmit: (props: ToastBeforeSubmitProps) => void;
}

export function useHelperSubmit(): HelperSubmitResponse {
  const router = useCustomRouter();
  const [isRedirecting, startTransition] = useTransition();

  async function showToastBeforeSubmit({
    message,
    callback,
    urlToRedirect,
  }: ToastBeforeSubmitProps) {
    const toastId = toast.loading(
      message?.loading ?? messages.form.STORING_INFORMATION,
    );

    try {
      await callback();

      toast.success(message?.success ?? messages.form.DATA_HAS_BEEN_UPDATED, {
        id: toastId,
        duration: 1500,
      });

      await new Promise((resolve) =>
        setTimeout(async () => {
          resolve(null);
        }, 1400),
      );

      startTransition(async () => {
        if (urlToRedirect) {
          router.push(urlToRedirect);
        } else {
          router.refresh();
        }
      });
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

  return { isRedirecting, showToastBeforeSubmit };
}
