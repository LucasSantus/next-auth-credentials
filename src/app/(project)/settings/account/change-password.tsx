"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updateActionProfile } from "@/actions/update/update-profile";
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
import { useCustomRouter } from "@/hooks/useCustomRouter";
import toastOptions from "@/utils/toast";
import {
  ProfileFormData,
  profileFormSchema,
} from "@/validation/settings/profile";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Mail, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getActionUserById } from "../../../../actions/get/get-user-by-id";

interface ProfileFormProps {
  id: string;
}

const ICON_CLASSNAMES = "h-5 w-5";

export function ProfileForm({ id }: ProfileFormProps) {
  const router = useCustomRouter();

  const { update } = useSession();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      try {
        return await getActionUserById(id);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);

        return {} as User;
      }
    },
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    values: {
      name: profile?.name ?? "",
      email: profile?.email ?? "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ProfileFormData) {
    const toastId = toast.loading(FORM_STORING_INFORMATION);

    try {
      await updateActionProfile(values);

      await update(values);

      toast.update(
        toastId,
        toastOptions.success({
          render: FORM_DATA_HAS_BEEN_UPDATED,
        }),
      );

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.update(toastId, toastOptions.error({ render: error.message }));
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          disabled={isSubmitting || isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome completo:"
                  isLoading={isLoading}
                  startComponent={<User2 className={ICON_CLASSNAMES} />}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o e-mail:"
                  isLoading={isLoading}
                  startComponent={<Mail className={ICON_CLASSNAMES} />}
                  {...field}
                />
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
