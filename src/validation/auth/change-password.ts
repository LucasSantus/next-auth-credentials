import { FORM_MAX_CHAR_LENGTH, FORM_MIN_CHAR_LENGTH } from "@/constants/form";
import { messages } from "@/constants/messages";
import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    email: z.string(),
    oldPassword: z
      .string({
        required_error: messages.form.REQUIRED_FIELD,
      })
      .min(8, FORM_MIN_CHAR_LENGTH(8))
      .max(50, FORM_MAX_CHAR_LENGTH(50)),
    password: z
      .string({
        required_error: messages.form.REQUIRED_FIELD,
      })
      .min(8, FORM_MIN_CHAR_LENGTH(8))
      .max(50, FORM_MAX_CHAR_LENGTH(50)),
    confirmPassword: z
      .string({
        required_error: messages.form.REQUIRED_FIELD,
      })
      .min(8, FORM_MIN_CHAR_LENGTH(8))
      .max(50, FORM_MAX_CHAR_LENGTH(50)),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não se coincidem",
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;
