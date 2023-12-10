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
      <span className="text-sm font-medium">
        © {PROJECT_NAME} | {year}, Todos os direitos reservados.
      </span>
    </footer>
  );
}
