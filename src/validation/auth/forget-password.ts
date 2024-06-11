import { messages } from "@/constants/messages";
import { z } from "zod";

export const forgetPasswordFormSchema = z.object({
  email: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .email({
      message: messages.form.INSERT_VALID_EMAIL,
    }),
});

export type ForgetPasswordFormData = z.infer<typeof forgetPasswordFormSchema>;
