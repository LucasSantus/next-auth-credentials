import { FORM_INSERT_VALID_EMAIL, FORM_REQUIRED_FIELD } from "@/constants/form";
import { z } from "zod";

export const forgetPasswordFormSchema = z.object({
  email: z
    .string({
      required_error: FORM_REQUIRED_FIELD,
    })
    .email({
      message: FORM_INSERT_VALID_EMAIL,
    }),
});

export type ForgetPasswordFormData = z.infer<typeof forgetPasswordFormSchema>;
