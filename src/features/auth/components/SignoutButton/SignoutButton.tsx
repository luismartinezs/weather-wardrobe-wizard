import { BiLogOut } from "react-icons/bi";
import { signOut } from "@/firebase/auth";
import ButtonWithIcon, {
  type ButtonWithIconProps,
} from "@/components/ButtonWithIcon";
import useStore from "@/store";
import { useTranslation } from "next-i18next";

const SignoutButton = ({
  size = "md",
}: Pick<ButtonWithIconProps, "size">): JSX.Element => {
  const { t } = useTranslation();
  const resetLocation = useStore((state) => state.resetLocation);

  const handleSignOut = () => {
    resetLocation();
    signOut();
  };

  return (
    <ButtonWithIcon size={size} onClick={handleSignOut} icon={BiLogOut}>
      {t("sign_out")}
    </ButtonWithIcon>
  );
};

export default SignoutButton;
