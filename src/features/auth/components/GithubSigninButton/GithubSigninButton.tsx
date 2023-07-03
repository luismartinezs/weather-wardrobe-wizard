import { AiOutlineGithub } from "react-icons/ai";
import ButtonWithIcon, {
  type ButtonWithIconProps,
} from "@/components/ButtonWithIcon";

import { useGithubSignin } from "@/features/auth/hooks/useGithubSignin";
import { useTranslation } from "next-i18next";

const GoogleSigninButton = ({
  size = "md",
}: Pick<ButtonWithIconProps, "size">): JSX.Element => {
  const { t } = useTranslation();
  const { handleGithubSignUp, loading } = useGithubSignin();

  return (
    <ButtonWithIcon
      size={size}
      onClick={handleGithubSignUp}
      icon={AiOutlineGithub}
      isLoading={loading}
    >
      {t("sign_in_with")} Github
    </ButtonWithIcon>
  );
};

export default GoogleSigninButton;
