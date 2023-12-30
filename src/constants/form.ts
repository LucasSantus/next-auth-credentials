export const FORM_REQUIRED_FIELD = "Campo obrigatório!";

export const FORM_INSERT_VALID_EMAIL = "Insira um e-mail válido!";

export const FORM_STORING_INFORMATION = "Armazenando informações...";

export const FORM_DATA_HAS_BEEN_STORED =
  "Os dados foram armazenados com êxito!";

export const FORM_DATA_HAS_BEEN_UPDATED = "Os dados foram alterados com êxito!";

export const ERROR_VALUES_VALIDATION =
  "Ops, parece que algo deu errado. Por favor, verifique os dados fornecidos e tente novamente.";

export const EMAIL_DONT_REGISTERED_ON_SYSTEM =
  "Desculpe, este e-mail não está cadastrado no sistema.";

export const EMAIL_REGISTERED_ON_SYSTEM =
  "Desculpe, este e-mail já está cadastrado no sistema.";

export const YOU_ARE_BEING_REDIRECTED = "Você está sendo redirecionado...";

export const USER_NOT_FOUND = "Usuário não encontrado!";

export const ACCOUNT_NOT_FOUND = "Conta não encontrada!";

/**
 * Returns a message indicating the minimum allowed character length.
 * @param value The number that represents the desired minimum length.
 * @returns A string informing that the minimum number of allowed characters is equal to the provided value.
 */
export function FORM_MIN_CHAR_LENGTH(value: number): string {
  return "O mínimo de caracteres é " + value;
}

/**
 * Returns a message indicating the maximum allowed character length.
 * @param value The number that represents the desired maximum length.
 * @returns A string informing that the maximum number of allowed characters is equal to the provided value.
 */
export function FORM_MAX_CHAR_LENGTH(value: number): string {
  return "O máximo de caracteres é " + value;
}
