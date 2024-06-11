"use client";

import ErrorHandling from "@/components/error-handling";
import { ErrorHandlingData } from "@/types/error-handling";

export default function SettingsErrorHandling(props: ErrorHandlingData) {
  return <ErrorHandling {...props} />;
}
