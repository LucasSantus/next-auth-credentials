"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updateProfileServer } from "@/actions/update/update-profile";
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
  ProfileFormData,
  profileFormSchema,
} from "@/validation/settings/profile";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Mail, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getUserByIdServer } from "../../../../actions/get/get-user-by-id";
import { DeleteAccount } from "./_components/delete-account";

interface ProfileFormProps {
  id: string;
}

const ICON_CLASSNAMES = "h-5 w-5";

export function ProfileForm({ id }: ProfileFormProps) {
  const { validateSubmit } = useHelperSubmit();

  const { update } = useSession();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      try {
        return await getUserByIdServer(id);
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
    await validateSubmit({
      callback: async () => {
        await updateProfileServer(values);
        await update(values);
      },
      redirect: {
        type: "refresh",
      },
      showMessageYouAreRedirected: false,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome completo:"
                  isLoading={isLoading}
                  disabled={isSubmitting || isLoading}
                  startComponent={<User2 className={ICON_CLASSNAMES} />}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o e-mail:"
                  isLoading={isLoading}
                  startComponent={<Mail className={ICON_CLASSNAMES} />}
                  readOnly
                  className="cursor-not-allowed opacity-70"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="submit"
            aria-label="Submit for update user data"
            isLoading={isSubmitting}
          >
            Salvar
          </Button>

          <DeleteAccount id={id} />
        </div>
      </form>
    </Form>
  );
}
