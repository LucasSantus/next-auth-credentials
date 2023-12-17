import { ToastContent, UpdateOptions } from "react-toastify";

type ToastUpdateType = {
  autoClose?: number;
  render: ToastContent<unknown>;
};

class ToastOptions {
  static defaultDelay: number | undefined = 3000;

  /**
   * Gera opções para exibir um toast de sucesso.
   * @param render Conteúdo do toast.
   * @returns Opções de atualização para o componente de toast.
   */
  static success({
    render,
    autoClose = this.defaultDelay,
  }: ToastUpdateType): UpdateOptions<unknown> {
    return {
      type: "success",
      isLoading: false,
      autoClose,
      render,
    };
  }

  /**
   * Gera opções para exibir um toast de erro.
   * @param render Conteúdo do toast.
   * @returns Opções de atualização para o componente de toast.
   */
  static error({
    render,
    autoClose = this.defaultDelay,
  }: ToastUpdateType): UpdateOptions<unknown> {
    return {
      type: "error",
      isLoading: false,
      autoClose,
      render,
    };
  }
}

export const toastOptions = new ToastOptions();


/**
 * Gera opções para exibir um toast de sucesso.
 * @param render Conteúdo do toast.
 * @returns Opções de atualização para o componente de toast.
 */
export function generateSuccessToastOptions({
  render,
  autoClose = 2000,
}: ToastUpdateType): UpdateOptions<unknown> {
  return {
    type: "success",
    isLoading: false,
    autoClose,
    render,
  };
}

/**
 * Gera opções para exibir um toast de erro.
 * @param render Conteúdo do toast.
 * @returns Opções de atualização para o componente de toast.
 */
export function generateErrorToastOptions({
  render,
  autoClose = 4000,
}: ToastUpdateType): UpdateOptions<unknown> {
  return {
    type: "error",
    isLoading: false,
    autoClose,
    render,
  };
}
