"use server";

import { prismaClient } from "@/lib/prisma";
import { NewCategoryFormData } from "@/validation/new-category";

interface NewCategoryProps extends NewCategoryFormData {
  userId: string;
}

export async function newCategory({
  title,
  description,
  slug,
  userId,
}: NewCategoryProps) {
  const category = await prismaClient.category.create({
    data: {
      title,
      description,
      slug,
      isActive: true,
      userId,
    },
  });

  return category;
}
