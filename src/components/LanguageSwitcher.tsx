import { Select } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div>
      <Select
        // placeholder={t("select_lang")}
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
        <option value="en">EN</option>
        <option value="es">ES</option>
      </Select>
    </div>
  );
}
