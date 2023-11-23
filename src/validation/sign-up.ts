import {
  MAX_CHAR_LENGTH,
  MIN_CHAR_LENGTH,
  REQUIRED_FIELD,
} from "@/constants/form";
import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z.string({
    required_error: REQUIRED_FIELD,
  }),
  email: z
    .string({
      required_error: REQUIRED_FIELD,
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z
    .string({
      required_error: REQUIRED_FIELD,
    })
    .min(8, MIN_CHAR_LENGTH + 8)
    .max(50, MAX_CHAR_LENGTH + 50),
  confirmPassword: z.string({
    required_error: REQUIRED_FIELD,
  }),
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
