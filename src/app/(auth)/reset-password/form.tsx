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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ResetPasswordFormProps {}

export function ResetPasswordForm({}: ResetPasswordFormProps) {
  // const router = useRouter();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "admin@admin.com",
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
        generateSuccessToastOptions({
          autoClose: 6000,
          render: "Será enviado um e-mail no teu cú",
        }),
      );
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
            name="email"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o e-mail: " {...field} />
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
