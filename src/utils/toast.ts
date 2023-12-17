import { ToastContent, UpdateOptions } from "react-toastify";

interface ToastUpdateType {
  autoClose?: number;
  render: ToastContent<unknown>;
}

type UpdateOptionsType = UpdateOptions<unknown>;

class ToastOptions {
  static readonly defaultDelay: number | undefined = 3000;

  private static generateToastOptions(
    type: "success" | "error",
    { render, autoClose = this.defaultDelay }: ToastUpdateType,
  ): UpdateOptionsType {
    return {
      type,
      isLoading: false,
      autoClose,
      render,
    };
  }

  /**
   * Gera opções para exibir um toast de sucesso.
   * @param render Conteúdo do toast.
   * @returns Opções de atualização para o componente de toast.
   */
  static success(fields: ToastUpdateType): UpdateOptionsType {
    return this.generateToastOptions("success", fields);
  }

  /**
   * Gera opções para exibir um toast de erro.
   * @param render Conteúdo do toast.
   * @returns Opções de atualização para o componente de toast.
   */
  static error(fields: ToastUpdateType): UpdateOptionsType {
    return this.generateToastOptions("error", fields);
  }
}

const toastOptions = ToastOptions;

export default toastOptions;
