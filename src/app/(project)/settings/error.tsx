"use client";

import ErrorHandling from "@/components/error-handling";
import { ErrorHandlingType } from "@/types/error-handling";

export default function SettingsErrorHandling(props: ErrorHandlingType) {
  return <ErrorHandling genericMessage={false} {...props} />;
}
