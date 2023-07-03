import { AiOutlineGoogle } from "react-icons/ai";
import ButtonWithIcon, {
  type ButtonWithIconProps,
} from "@/components/ButtonWithIcon";

import { useGoogleSignin } from "@/features/auth/hooks/useGoogleSignin";
import { useTranslation } from "next-i18next";

const GoogleSigninButton = ({
  size = "md",
}: Pick<ButtonWithIconProps, "size">): JSX.Element => {
  const { t } = useTranslation();
  const { handleGoogleSignUp, loading } = useGoogleSignin();

  return (
    <ButtonWithIcon
      size={size}
      onClick={handleGoogleSignUp}
      icon={AiOutlineGoogle}
      isLoading={loading}
    >
      {t("sign_in_with")} Google
    </ButtonWithIcon>
  );
};

export default GoogleSigninButton;
