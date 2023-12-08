"use client";

import { actionResetPassword } from "@/actions/auth/reset-password";
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
import { FORM_STORING_INFORMATION } from "@/constants/form";
import {
  generateErrorToastOptions,
  generateSuccessToastOptions,
} from "@/utils/toast";
import {
  ResetPasswordFormData,
  resetPasswordFormSchema,
} from "@/validation/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ResetPasswordFormProps {
  email: string;
}

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const router = useRouter();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email,
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ResetPasswordFormData) {
    const toastId = toast.loading(FORM_STORING_INFORMATION);

    try {
      await actionResetPassword(values);

      toast.update(
        toastId,
        generateSuccessToastOptions({
          autoClose: 6000,
          render: "Ops, enfiei o e-mail no seu cú!",
        }),
      );

      router.push("/sign-in");
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
            control={control}
            name="password"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a senha: " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirmPassword"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmação de Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a confirmação de senha: "
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
          >
            Recuperar
          </Button>
        </div>
      </form>
    </Form>
  );
}
