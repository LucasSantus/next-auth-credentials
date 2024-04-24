"use client";

import ErrorHandling from "@/components/error-handling";
import { ErrorHandlingData } from "@/types/error-handling";

export default function GlobalErrorHandling(props: ErrorHandlingData) {
  return <ErrorHandling {...props} />;
}
