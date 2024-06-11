import { ContentLayout } from "@/components/content-layout";
import PlaceholderContent from "@/components/placeholder-content";
import { Metadata } from "next";
import { DashboardBreadcrumb } from "./breadcrumb";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <DashboardBreadcrumb />

      <PlaceholderContent />
    </ContentLayout>
  );
}
