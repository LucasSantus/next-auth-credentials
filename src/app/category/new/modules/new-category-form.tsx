"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  NewCategoryFormData,
  newCategoryFormSchema,
} from "@/validation/new-category";
import { Session } from "next-auth";
import { toast } from "react-toastify";
import { newCategory } from "../../../../actions/new-category";

interface NewCategoryFormProps {
  session: Session;
}

export function NewCategoryForm({ session }: NewCategoryFormProps) {
  const form = useForm<NewCategoryFormData>({
    resolver: zodResolver(newCategoryFormSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
    },
  });

  const { handleSubmit, control } = form;

  async function onSubmit(values: NewCategoryFormData) {
    const toastify = toast.loading("Salvando dados...");

    try {
      await newCategory({
        userId: session.user.id,
        ...values,
      });

      toast.update(toastify, {
        render: "Usuario registrado com sucesso!",
        autoClose: 3000,
        type: "success",
        isLoading: false,
      });
    } catch (error) {
      const errorFormatter = error as {
        message: string;
      };

      toast.update(toastify, {
        render: errorFormatter.message,
        autoClose: 3000,
        type: "error",
        isLoading: false,
      });
    }
  }

  return (
    <div className="mt-7 w-full sm:mt-12">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid gap-2">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Titulo: " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Descricao: " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="slug"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Slug: " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" aria-label="Submit for create new user">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
