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
