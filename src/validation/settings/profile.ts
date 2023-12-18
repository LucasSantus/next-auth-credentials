import { FORM_REQUIRED_FIELD } from "@/constants/form";
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string({
    required_error: FORM_REQUIRED_FIELD,
  }),
  email: z
    .string({
      required_error: FORM_REQUIRED_FIELD,
    })
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
