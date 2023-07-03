import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeButton = ({
  buttonProps = {},
}: {
  buttonProps?: Omit<IconButtonProps, "aria-label" | "variant">;
}): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";
  const msg = {
    light: "Switch to dark theme",
    dark: "Switch to light theme",
  };
  const icon = {
    light: <FaMoon />,
    dark: <FaSun />,
  };

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={icon[colorMode]}
      aria-label={msg[colorMode]}
      variant="ghost"
      _hover={{
        bg: isLight ? "primary.100" : "primary.900",
      }}
      {...buttonProps}
    />
  );
};

export default ThemeButton;
