"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

interface SearchFormProps {}

import { actionSignUp } from "@/actions/auth/sign-up";
import { InputPassword } from "@/components/input-password";
import {
  FORM_DATA_HAS_BEEN_STORED,
  FORM_STORING_INFORMATION,
  YOU_ARE_BEING_REDIRECTED,
} from "@/constants/form";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import toastOptions from "@/utils/toast";
import { SignUpFormData, signUpFormSchema } from "@/validation/auth/sign-up";
import { toast } from "react-toastify";
import { AuthenticationProviders } from "../_components/authentication-providers";

export function SignUpForm({}: SearchFormProps) {
  const router = useCustomRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: SignUpFormData) {
    const toastId = toast.loading(FORM_STORING_INFORMATION);

    try {
      await actionSignUp(values);

      toast.update(
        toastId,
        toastOptions.success({
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
      <div className="grid gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-2">
          <FormField
            control={control}
            name="name"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome completo:" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o e-mail:" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button
            type="submit"
            aria-label="Submit for create new user"
            isLoading={isSubmitting}
          >
            Salvar
          </Button>
        </form>

        <AuthenticationProviders isLoading={isSubmitting} />
      </div>
    </Form>
  );
}
