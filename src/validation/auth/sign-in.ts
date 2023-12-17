import { FORM_INSERT_VALID_EMAIL, FORM_REQUIRED_FIELD } from "@/constants/form";
import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string({
      required_error: FORM_REQUIRED_FIELD,
    })
    .email({
      message: FORM_INSERT_VALID_EMAIL,
    }),
  password: z
    .string({
      required_error: FORM_REQUIRED_FIELD,
    })
    .min(1, "Insira a senha!"),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
