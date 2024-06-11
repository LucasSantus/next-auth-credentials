import { PROJECT_NAME } from "@/constants/config";

export function Footer(): JSX.Element {
  const selectedYear = "2023";
  const currentYear = new Date().getFullYear().toString();

  const year =
    Number(currentYear) > Number(selectedYear)
      ? `${selectedYear}-${currentYear}`
      : selectedYear;

  return (
    <footer className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 flex h-14 items-center md:mx-8">
        <p className="text-left text-xs leading-loose text-muted-foreground md:text-sm">
          © {PROJECT_NAME} | {year}
        </p>
      </div>
    </footer>
  );
}
