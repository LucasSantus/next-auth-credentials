import {
  FORM_DATA_HAS_BEEN_UPDATED,
  FORM_STORING_INFORMATION,
  YOU_ARE_BEING_REDIRECTED,
} from "@/constants/form";
import toastOptions from "@/utils/toast";
import { toast } from "react-toastify";
import { useCustomRouter } from "./use-custom-router";

interface ValidateSubmitProps {
  toastMessage?: {
    loadingMessage?: string;
    updateMessage?: string;
  };
  callback: () => void;
  redirect:
    | {
        type: "redirect";
        urlToRedirect: string;
      }
    | {
        type: "refresh";
      };
  showMessageYouAreRedirected?: boolean;
}

interface HelperSubmitResponse {
  validateSubmit: (props: ValidateSubmitProps) => void;
}

export function useHelperSubmit(): HelperSubmitResponse {
  const router = useCustomRouter();

  async function validateSubmit({
    toastMessage,
    callback,
    redirect,
    showMessageYouAreRedirected = true,
  }: ValidateSubmitProps) {
    const toastId = toast.loading(
      toastMessage?.loadingMessage ?? FORM_STORING_INFORMATION,
    );

    try {
      await callback();

      toast.update(
        toastId,
        toastOptions.success({
          render: toastMessage?.updateMessage ?? FORM_DATA_HAS_BEEN_UPDATED,
        }),
      );

      if (showMessageYouAreRedirected)
        toast.info(YOU_ARE_BEING_REDIRECTED, {
          autoClose: 3900,
        });

      await new Promise((resolve) =>
        setTimeout(() => {
          if (redirect.type === "redirect") {
            router.push(redirect.urlToRedirect);
          } else if (redirect.type === "refresh") {
            router.refresh();
          }

          resolve(null);
        }, 4000),
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.update(
          toastId,
          toastOptions.error({ render: error.message, autoClose: 5000 }),
        );
      }
    }
  }

  return { validateSubmit };
}
