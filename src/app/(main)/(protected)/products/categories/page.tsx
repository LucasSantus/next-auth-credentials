import { ContentLayout } from "@/components/content-layout";
import PlaceholderContent from "@/components/placeholder-content";
import { Metadata } from "next";
import { CategoryBreadcrumb } from "./breadcrumb";

export const metadata: Metadata = {
  title: "Categorias",
};

export default async function CategoriesPage() {
  return (
    <ContentLayout title="Categorias">
      <CategoryBreadcrumb />

      <PlaceholderContent />
    </ContentLayout>
  );
}
