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
import { useHelperSubmit } from "@/hooks/useHelperSubmit";

import {
  ForgetPasswordFormData,
  forgetPasswordFormSchema,
} from "@/validation/auth/forget-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontalIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface ForgetPasswordFormProps {}

export function ForgetPasswordForm({}: ForgetPasswordFormProps) {
  const { showToastBeforeSubmit } = useHelperSubmit();

  const form = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ForgetPasswordFormData) {
    await showToastBeforeSubmit({
      message: {
        loading:
          "Enviando e-mail com as informações da recuperação da conta...",
        success: "O e-mail foi enviado!",
      },
      callback: async () => await authForgetPasswordServer(values),
      urlToRedirect: "/sign-in",
    });
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
                <FormLabel>E-mail</FormLabel>
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

          <Button
            type="submit"
            aria-label="forget password of user"
            isLoading={isSubmitting}
            icon={<SendHorizontalIcon className="size-4" />}
          >
            Recuperar
          </Button>
        </div>
      </form>
    </Form>
  );
}
