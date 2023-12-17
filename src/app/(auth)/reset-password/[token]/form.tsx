"use client";

import { actionResetPassword } from "@/actions/auth/reset-password";
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
import {
  FORM_DATA_HAS_BEEN_STORED,
  FORM_STORING_INFORMATION,
  YOU_ARE_BEING_REDIRECTED,
} from "@/constants/form";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import toastOptions from "@/utils/toast";
import {
  ResetPasswordFormData,
  resetPasswordFormSchema,
} from "@/validation/auth/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ResetPasswordFormProps {
  email: string;
}

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const router = useCustomRouter();

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
    const toastId = toast.loading(FORM_STORING_INFORMATION);

    try {
      await actionResetPassword(values);

      toast.update(
        toastId,
        toastOptions.success({
          autoClose: 2900,
          render: FORM_DATA_HAS_BEEN_STORED,
        }),
      );

      toast.info(YOU_ARE_BEING_REDIRECTED, {
        autoClose: 2900,
      });

      new Promise(() => {
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      });
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
            name="password"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <InputPassword placeholder="Digite a senha:" {...field} />
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
                  <InputPassword
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
