import { Select } from "@chakra-ui/react";

export default function LanguageSwitcher() {
  return (
    <div>
      <Select placeholder="Select language">
        <option value="en">English</option>
        <option value="es">Español</option>
      </Select>
    </div>
  );
}
