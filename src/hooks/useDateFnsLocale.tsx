import { useTranslation } from "next-i18next";
import { enUS, es } from "date-fns/locale";

export const useDateFnsLocale = () => {
  const { i18n } = useTranslation();

  const dateFnsLocaleMap: Record<string, Locale> = {
    en: enUS,
    es: es,
  };

  const dateFnsLocale = dateFnsLocaleMap[i18n.language] || enUS;

  return dateFnsLocale;
};
