"use client";

import { authForgetPasswordServer } from "@/actions/auth/forget-password";
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
import { useHelperSubmit } from "@/hooks/use-helper-submit";

import {
  ForgetPasswordFormData,
  forgetPasswordFormSchema,
} from "@/validation/auth/forget-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontalIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface ForgetPasswordFormProps {}

export function ForgetPasswordForm({}: ForgetPasswordFormProps) {
  const { isRedirecting, showToastBeforeSubmit } = useHelperSubmit();

  const form = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordFormSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ForgetPasswordFormData) {
    await showToastBeforeSubmit({
      urlToRedirect: "/sign-in",
      message: {
        loading:
          "Enviando e-mail com as informações da recuperação da conta...",
        success: "O e-mail foi enviado!",
      },
      callback: async () => await authForgetPasswordServer(values),
    });
  }

  const isDisabled = isSubmitting || isRedirecting;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-2">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
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

          <Button
            type="submit"
            aria-label="forget password of user"
            isLoading={isDisabled}
            icon={<SendHorizontalIcon className="size-4" />}
          >
            Recuperar
          </Button>
        </div>
      </form>
    </Form>
  );
}
