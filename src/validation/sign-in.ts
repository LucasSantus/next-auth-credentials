import { REQUIRED_FIELD } from "@/constants/form";
import { z } from "zod";

export const signInFormSchema = z.object({
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
    .min(8)
    .max(50),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
