import { FORM_MAX_CHAR_LENGTH, FORM_MIN_CHAR_LENGTH } from "@/constants/form";
import { messages } from "@/constants/globals";
import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .min(1, "Insira o nome completo!"),
  email: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .email({
      message: messages.form.INSERT_VALID_EMAIL,
    }),
  password: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .min(8, FORM_MIN_CHAR_LENGTH(8))
    .max(50, FORM_MAX_CHAR_LENGTH(50)),
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
