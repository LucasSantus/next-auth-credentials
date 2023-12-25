"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { authActionChangePassword } from "@/actions/auth/change-password";
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
import { useHelperSubmit } from "@/hooks/useHelperSubmit";
import {
  ChangePasswordFormData,
  changePasswordFormSchema,
} from "@/validation/auth/change-password";

interface ProfileFormProps {
  email: string;
}

export function ChangePasswordForm({ email }: ProfileFormProps) {
  const { validateSubmit } = useHelperSubmit();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    mode: "onChange",
    values: {
      email: email ?? "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ChangePasswordFormData) {
    await validateSubmit({
      callback: async () => await authActionChangePassword(values),
      redirect: {
        type: "refresh",
      },
      showMessageYouAreRedirected: false,
    });
    reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha Antiga</FormLabel>
              <FormControl>
                <InputPassword
                  placeholder="Digite a senha antiga:"
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
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <InputPassword
                  placeholder="Digite a nova senha:"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmação de Nova Senha</FormLabel>
              <FormControl>
                <InputPassword
                  placeholder="Digite a confirmação de nova senha:"
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
          aria-label="Submit for update user data"
          isLoading={isSubmitting}
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
