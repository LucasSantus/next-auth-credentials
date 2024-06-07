import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export default function PlaceholderContent() {
  return (
    <Card className="mt-6 rounded-lg border-none">
      <CardContent className="p-6">
        <div className="flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] items-center justify-center">
          <div className="relative flex flex-col">
            <Image
              src="/placeholder.png"
              alt="Placeholder Image"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
