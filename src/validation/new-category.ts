import { z } from "zod";

export const newCategoryFormSchema = z.object({
  title: z.string({
    required_error: "Campo obrigatorio",
  }),
  description: z.string({
    required_error: "Campo obrigatorio",
  }),
  slug: z.string({
    required_error: "Campo obrigatorio",
  }),
});

export type NewCategoryFormData = z.infer<typeof newCategoryFormSchema>;
