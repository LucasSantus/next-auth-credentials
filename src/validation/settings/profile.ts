import { messages } from "@/constants/messages";
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string({
    required_error: messages.form.REQUIRED_FIELD,
  }),
  email: z
    .string({
      required_error: messages.form.REQUIRED_FIELD,
    })
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
