import { Loader2Icon } from "lucide-react";

export function Loader(): JSX.Element {
  return (
    <div className="flex w-full items-center justify-center">
      <Loader2Icon className="animate-spin" />
    </div>
  );
}
