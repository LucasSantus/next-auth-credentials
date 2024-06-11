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
import { SaveIcon } from "lucide-react";
import { useState } from "react";
import { AuthenticationProviders } from "../_components/authentication-providers";

export function SignUpForm({}: SearchFormProps) {
  const { isRedirecting: isRedirectingNewPage, showToastBeforeSubmit } =
    useHelperSubmit();

  const [isRedirectingToProviders, setIsRedirectingToProviders] =
    useState<boolean>(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: SignUpFormData) {
    await showToastBeforeSubmit({
      urlToRedirect: "/sign-in",
      message: {
        loading: "Registrando novo usuário...",
        success: "Usuário registrado com sucesso!",
      },
      callback: async () => await authSignUpServer(values),
    });
  }

  const isDisabled =
    isSubmitting || isRedirectingToProviders || isRedirectingNewPage;

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
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
            isLoading={isSubmitting || isRedirectingNewPage}
            disabled={isDisabled}
            icon={<SaveIcon className="size-4" />}
          >
            Salvar
          </Button>
        </form>

        <AuthenticationProviders
          isDisabled={isDisabled}
          isRedirecting={isRedirectingToProviders}
          setIsRedirecting={setIsRedirectingToProviders}
        />
      </div>
    </Form>
  );
}
