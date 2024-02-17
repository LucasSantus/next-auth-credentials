import {
  FORM_DATA_HAS_BEEN_UPDATED,
  FORM_STORING_INFORMATION,
  YOU_ARE_BEING_REDIRECTED,
} from "@/constants/form";
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
    const toastId = toast.loading(message?.loading ?? FORM_STORING_INFORMATION);

    try {
      await callback();

      toast.success(message?.success ?? FORM_DATA_HAS_BEEN_UPDATED, {
        id: toastId,
      });

      if (showMessageYouAreRedirected)
        toast.info(YOU_ARE_BEING_REDIRECTED, {
          duration: 2500,
        });

      await new Promise((resolve) =>
        setTimeout(() => {
          if (urlToRedirect) {
            router.push(urlToRedirect);
          } else {
            router.refresh();
          }

          resolve(null);
        }, 3000),
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          id: toastId,
          duration: 4000,
        });
      }
    }
  }

  return { showToastBeforeSubmit };
}
