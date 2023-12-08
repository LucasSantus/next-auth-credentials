"use client";

import { actionForgetPassword } from "@/actions/auth/forget-password";
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
import {
  generateErrorToastOptions,
  generateSuccessToastOptions,
} from "@/utils/toast";
import {
  ForgetPasswordFormData,
  forgetPasswordFormSchema,
} from "@/validation/forget-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ForgetPasswordFormProps {}

export function ForgetPasswordForm({}: ForgetPasswordFormProps) {
  const router = useRouter();

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
    const toastId = toast.loading(
      "Enviando e-mail com as informações da recuperação da conta!",
    );

    try {
      await actionForgetPassword(values);

      toast.update(
        toastId,
        generateSuccessToastOptions({
          autoClose: 2900,
          render: "O e-mail foi enviado!",
        }),
      );

      toast.info("Você está sendo redirecionado...", {
        autoClose: 2900,
      });

      new Promise(() => {
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      });
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
