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

import { newUser } from "@/actions/new/user";
import { SignUpFormData, signUpFormSchema } from "@/validation/sign-up";
import { toast } from "react-toastify";

export function SignUpForm({}: SearchFormProps) {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "Admin",
      email: "admin@admin.com",
      password: "1234567890",
      confirmPassword: "1234567890",
    },
  });

  const { handleSubmit, control } = form;

  async function onSubmit(values: SignUpFormData) {
    try {
      const user = await newUser(values);

      if (user) toast.success("BOOOOOUA CARALLEEEO");
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nome de usuário: "
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
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirmar Senha: "
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
