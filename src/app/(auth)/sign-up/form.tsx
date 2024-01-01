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
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

interface SearchFormProps {}

import { authSignUpServer } from "@/actions/auth/sign-up";
import { InputPassword } from "@/components/input-password";
import { useHelperSubmit } from "@/hooks/use-helper-submit";
import { SignUpFormData, signUpFormSchema } from "@/validation/auth/sign-up";
import { AuthenticationProviders } from "../_components/authentication-providers";

export function SignUpForm({}: SearchFormProps) {
  const { validateSubmit } = useHelperSubmit();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: SignUpFormData) {
    await validateSubmit({
      callback: async () => await authSignUpServer(values),
      redirect: {
        type: "redirect",
        urlToRedirect: "/sign-in",
      },
      toastMessage: {
        loadingMessage: "Usuário está sendo criado!",
        updateMessage: "Usuário criado com sucesso!",
      },
    });
  }

  return (
    <Form {...form}>
      <div className="grid gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome completo:"
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

          <Button
            type="submit"
            aria-label="Submit for create new user"
            isLoading={isSubmitting}
          >
            Salvar
          </Button>
        </form>

        <AuthenticationProviders isLoading={isSubmitting} />
      </div>
    </Form>
  );
}
