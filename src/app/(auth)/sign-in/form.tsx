"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  generateErrorToastOptions,
  generateSuccessToastOptions,
} from "@/utils/toast";
import { SignInFormData, signInFormSchema } from "@/validation/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthLink } from "../_components/auth-link";

interface SignInFormProps {}

export function SignInForm({}: SignInFormProps) {
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "admin@admin.com",
      password: "1234567890",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit({ email, password }: SignInFormData) {
    const toastId = toast.loading("Logando no sistema...");

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!!response && response.error) {
        toast.update(
          toastId,
          generateErrorToastOptions({ render: response.error }),
        );
      } else {
        toast.update(
          toastId,
          generateSuccessToastOptions({
            autoClose: 100,
            render: "Redirecionando...",
          }),
        );

        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.update(
          toastId,
          generateErrorToastOptions({ render: error.message }),
        );
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-2">
          <FormField
            control={control}
            name="email"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o e-mail: " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a senha: " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <AuthLink title="Esqueci minha senha" href="/forget-password" />
          </div>

          <Button
            type="submit"
            aria-label="log-in in system"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
