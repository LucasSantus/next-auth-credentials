import { bounceHorizontalAnimation } from "@/utils/framer-motion/animations/bounce-horizontal";
import { Framing } from "./framer-motion/framing";
import { Separator } from "./ui/separator";

interface TitlePageProps {
  title: string;
  description?: string;
  shouldDisplayTheSeparator?: boolean;
}

export function PageDescription({
  title,
  description,
  shouldDisplayTheSeparator = true,
}: TitlePageProps): JSX.Element {
  return (
    <Framing className="space-y-4" {...bounceHorizontalAnimation({})}>
      <div className="-mx-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {shouldDisplayTheSeparator && <Separator className="-mx-4" />}
    </Framing>
  );
}
