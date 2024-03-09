"use client";

import { authResetPasswordServer } from "@/actions/auth/reset-password";
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
  ResetPasswordFormData,
  resetPasswordFormSchema,
} from "@/validation/auth/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface ResetPasswordFormProps {
  email: string;
}

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const { showToastBeforeSubmit } = useHelperSubmit();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email,
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ResetPasswordFormData) {
    await showToastBeforeSubmit({
      callback: async () => await authResetPasswordServer(values),
      urlToRedirect: "/sign-in",
      message: {
        loading: "Senha está sendo resetada!",
        success: "Senha resetada com sucesso!",
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-2">
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

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmação de Senha</FormLabel>
                <FormControl>
                  <InputPassword
                    placeholder="Digite a confirmação de senha:"
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
            aria-label="reset password of user"
            isLoading={isSubmitting}
            icon={<MailIcon className="size-4" />}
          >
            Recuperar
          </Button>
        </div>
      </form>
    </Form>
  );
}
