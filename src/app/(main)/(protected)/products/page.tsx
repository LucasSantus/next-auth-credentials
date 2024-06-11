import { ContentLayout } from "@/components/content-layout";
import PlaceholderContent from "@/components/placeholder-content";
import { Metadata } from "next";
import { ProductBreadcrumb } from "./breadcrumb";

export const metadata: Metadata = {
  title: "Produtos",
};

export default async function ProductPage() {
  return (
    <ContentLayout title="Produtos">
      <ProductBreadcrumb />

      <PlaceholderContent />
    </ContentLayout>
  );
}
