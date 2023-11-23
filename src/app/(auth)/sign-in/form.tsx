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
import { SignInFormData, signInFormSchema } from "@/validation/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface SignInFormProps {}

export function SignInForm({}: SignInFormProps) {
  const { push } = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "admin@admin.com",
      password: "1234567890",
    },
  });

  const { handleSubmit, control } = form;

  async function onSubmit(values: SignInFormData) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      alert(JSON.stringify(response));

      if (!!response && response.error) {
        toast.error(response.error);
      } else {
        push("/");
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
      <Link href="/sign-up" className="text-white">
        Criar conta
      </Link>
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
