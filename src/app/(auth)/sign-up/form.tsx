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
import {
  FORM_DATA_HAS_BEEN_STORED,
  FORM_STORING_INFORMATION,
  YOU_ARE_BEING_REDIRECTED,
} from "@/constants/form";
import {
  generateErrorToastOptions,
  generateSuccessToastOptions,
} from "@/utils/toast";
import { SignUpFormData, signUpFormSchema } from "@/validation/sign-up";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function SignUpForm({}: SearchFormProps) {
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "Lucas Santos",
      email: "leos.developer@gmail.com",
      password: "1234567890",
    },
    mode: "onBlur",
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
        generateSuccessToastOptions({
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
        toast.update(
          toastId,
          generateErrorToastOptions({ render: error.message }),
        );
      }
    }
  }

  return (
    <Form {...form}>
      <div className="grid gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-2">
          <FormField
            control={control}
            name="name"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome completo: " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button
            type="submit"
            aria-label="Submit for create new user"
            isLoading={isSubmitting}
          >
            Salvar
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2">OU CONTINUAR COM</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
          <Button
            className="gap-2"
            disabled={isSubmitting}
            onClick={() => signIn("github")}
          >
            <Github size={15} />
          </Button>
          <Button
            className="gap-2"
            disabled={isSubmitting}
            onClick={() => signIn("google")}
          >
            <Github size={15} />
          </Button>
        </div>
      </div>
    </Form>
  );
}
