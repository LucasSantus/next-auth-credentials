import {
  FORM_MAX_CHAR_LENGTH,
  FORM_MIN_CHAR_LENGTH,
  FORM_REQUIRED_FIELD,
} from "@/constants/form";
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, FORM_MIN_CHAR_LENGTH(2))
    .max(30, FORM_MAX_CHAR_LENGTH(30)),
  email: z
    .string({
      required_error: FORM_REQUIRED_FIELD,
    })
    .email(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
