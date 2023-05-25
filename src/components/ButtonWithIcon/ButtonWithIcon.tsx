import { Button, type ButtonProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

export type ButtonWithIconProps = {
  size?: ButtonProps["size"];
  icon: IconType;
  onClick: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
};

const iconSizeMap: Record<string, number> = {
  default: 6,
  sm: 4,
  md: 5,
  lg: 6,
};

const ButtonWithIcon = ({
  size = "md",
  icon,
  onClick,
  children,
  isLoading,
}: ButtonWithIconProps): JSX.Element => {
  const iconSize = iconSizeMap[typeof size === "string" ? size : "default"];
  return (
    <Button
      size={size}
      variant="outline"
      onClick={onClick}
      leftIcon={<Icon boxSize={iconSize} as={icon} />}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export default ButtonWithIcon;
