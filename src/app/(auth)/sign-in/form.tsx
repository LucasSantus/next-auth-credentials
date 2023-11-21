"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

interface SearchFormProps {}

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { z } from "zod";

export const newUserFormSchema = z.object({
  email: z
    .string({
      required_error: "Please enter your email address.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z
    .string({
      required_error: "Please enter a password.",
    })
    .min(8)
    .max(50),
});

export type NewUserFormData = z.infer<typeof newUserFormSchema>;

export function NewUserForm({}: SearchFormProps) {
  const form = useForm<NewUserFormData>({
    resolver: zodResolver(newUserFormSchema),
    defaultValues: {
      email: "admin@admin.com",
      password: "1234567890",
    },
  });

  const { handleSubmit, control } = form;

  async function onSubmit(values: NewUserFormData) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      console.log(response);

      if (!response?.ok) {
        toast.error("deu bosta kkk");
      }
    } catch (error) {
      const errorFormatter = error as {
        message: string;
      };

      toast.error(errorFormatter.message);
    }
  }

  return (
    <div className="mt-7 w-full sm:mt-12">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid gap-2">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email: "
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Senha: "
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" aria-label="Submit for create new user">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
