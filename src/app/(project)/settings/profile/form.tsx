"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { actionUpdateProfile } from "@/actions/settings/update/profile";
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
  FORM_DATA_HAS_BEEN_UPDATED,
  FORM_STORING_INFORMATION,
} from "@/constants/form";
import toastOptions from "@/utils/toast";
import {
  ProfileFormData,
  profileFormSchema,
} from "@/validation/settings/profile";
import { toast } from "react-toastify";

interface ProfileFormProps {
  defaultValues: ProfileFormData;
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ProfileFormData) {
    const toastId = toast.loading(FORM_STORING_INFORMATION);

    try {
      await actionUpdateProfile(values);

      toast.update(
        toastId,
        toastOptions.success({
          render: FORM_DATA_HAS_BEEN_UPDATED,
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.update(toastId, toastOptions.error({ render: error.message }));
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
          disabled
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

        <Button
          type="submit"
          aria-label="Submit for update user data"
          isLoading={isSubmitting}
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
