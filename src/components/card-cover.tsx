import { PropsWithChildren } from "react";
import { Card, CardContent } from "./ui/card";

export function CardCover({ children }: PropsWithChildren): JSX.Element {
  return (
    <Card className="mt-6 rounded-lg border-none">
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}
