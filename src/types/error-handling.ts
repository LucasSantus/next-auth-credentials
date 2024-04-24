export interface ErrorHandlingData {
  error: Error & { digest?: string };
  reset: () => void;
}
