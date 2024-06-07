import { PROJECT_NAME } from "@/constants/config";

export function Footer(): JSX.Element {
  const selectedYear = "2023";
  const currentYear = new Date().getFullYear().toString();

  const year =
    Number(currentYear) > Number(selectedYear)
      ? `${selectedYear}-${currentYear}`
      : selectedYear;

  return (
    <footer>
      <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <span className="text-sm font-medium">
          © {PROJECT_NAME} | {year}
        </span>
      </div>
    </footer>
  );
}
