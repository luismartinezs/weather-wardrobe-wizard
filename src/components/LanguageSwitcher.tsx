import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();
  return (
    <div>
      <Select
        placeholder="Select language"
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
        <option value="en">English</option>
        <option value="es">Español</option>
      </Select>
    </div>
  );
}
