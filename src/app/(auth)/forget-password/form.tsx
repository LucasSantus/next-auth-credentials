"use client";

import { authActionForgetPassword } from "@/actions/auth/forget-password";
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
import { useForm } from "react-hook-form";

interface ForgetPasswordFormProps {}

export function ForgetPasswordForm({}: ForgetPasswordFormProps) {
  const { validateSubmit } = useHelperSubmit();

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
    await validateSubmit({
      toastMessage: {
        loadingMessage:
          "Enviando e-mail com as informações da recuperação da conta...",
        updateMessage: "O e-mail foi enviado!",
      },
      callback: async () => await authActionForgetPassword(values),
      redirect: {
        type: "redirect",
        urlToRedirect: "/sign-in",
      },
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
          >
            Recuperar
          </Button>
        </div>
      </form>
    </Form>
  );
}
