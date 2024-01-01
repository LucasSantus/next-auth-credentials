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
import { useCustomRouter } from "@/hooks/use-custom-router";
import toastOptions from "@/utils/toast";
import { SignInFormData, signInFormSchema } from "@/validation/auth/sign-in";
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
        toast.update(toastId, toastOptions.error({ render: response.error }));
      } else {
        toast.update(
          toastId,
          toastOptions.success({
            render: "Redirecionando...",
          }),
        );

        await new Promise((resolve) =>
          setTimeout(() => {
            router.push("/");
            resolve(null);
          }, 3000),
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.update(toastId, toastOptions.error({ render: error.message }));
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o e-mail:"
                    disabled={isSubmitting}
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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <InputPassword
                    placeholder="Digite a senha:"
                    disabled={isSubmitting}
                    {...field}
                  />
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
