import { Locale } from "react-joyride";
import { LocaleItem } from "./locale-item";

export const locale: Locale = {
  skip: (
    <LocaleItem aria-label="skip" className="text-black/80 hover:opacity-70">
      Skip
    </LocaleItem>
  ),
  next: <LocaleItem aria-label="next">Próximo</LocaleItem>,
  back: (
    <LocaleItem aria-label="back" className="text-primary">
      Anterior
    </LocaleItem>
  ),
  last: <LocaleItem aria-label="last">Último</LocaleItem>,
};
