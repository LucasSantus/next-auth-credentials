import { ContentLayout } from "@/components/content-layout";
import { Metadata } from "next";
import { InitialBreadcrumb } from "./breadcrumb";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function InitialPage() {
  return (
    <ContentLayout title="Página Inicial">
      <InitialBreadcrumb />
    </ContentLayout>
  );
}
