"use client";

import { InputPassword } from "@/components/input-password";
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
import { useCustomRouter } from "@/hooks/useCustomRouter";
import {
  generateErrorToastOptions,
  generateSuccessToastOptions,
} from "@/utils/toast";
import { SignInFormData, signInFormSchema } from "@/validation/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthenticationProviders } from "../_components/authentication-providers";
import { AuthenticationRedirect } from "../_components/authentication-redirect";

interface SignInFormProps {}

export function SignInForm({}: SignInFormProps) {
  const router = useCustomRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
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
            name="email"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o e-mail:" {...field} />
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
                  <InputPassword placeholder="Digite a senha:" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <AuthenticationRedirect
              title="Esqueci minha senha"
              href="/forget-password"
            />
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

      <AuthenticationProviders isLoading={isSubmitting} />
    </Form>
  );
}
