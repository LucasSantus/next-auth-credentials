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
import { useHelperSubmit } from "@/hooks/use-helper-submit";
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
  const { isRedirecting, showToastBeforeSubmit } = useHelperSubmit();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const isDisabled = isSubmitting || isRedirecting;

  async function onSubmit(values: ResetPasswordFormData) {
    await showToastBeforeSubmit({
      urlToRedirect: "/sign-in",
      message: {
        loading: "Senha está sendo resetada!",
        success: "Senha resetada com sucesso!",
      },
      callback: async () => await authResetPasswordServer(values),
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmação de Senha</FormLabel>
                <FormControl>
                  <InputPassword
                    placeholder="Digite a confirmação de senha:"
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
            aria-label="reset password of user"
            isLoading={isDisabled}
            icon={<MailIcon className="size-4" />}
          >
            Recuperar
          </Button>
        </div>
      </form>
    </Form>
  );
}
