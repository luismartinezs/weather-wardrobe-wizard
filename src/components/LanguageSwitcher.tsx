import { Select } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const options = [
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const lang = i18n.language || i18n.resolvedLanguage;

  return (
    <div>
      <Select
        value={lang}
        onChange={(e) =>
          router.push(
            {
              pathname: router.pathname,
              query: router.query,
            },
            undefined,
            { locale: e.target.value }
          )
        }
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </div>
  );
}
