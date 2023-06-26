import { AiOutlineGithub } from "react-icons/ai";
import ButtonWithIcon, {
  type ButtonWithIconProps,
} from "@/components/ButtonWithIcon";

import { useGithubSignin } from "@/features/auth/hooks/useGithubSignin";

const GoogleSigninButton = ({
  size = "md",
}: Pick<ButtonWithIconProps, "size">): JSX.Element => {
  const { handleGithubSignUp, loading } = useGithubSignin();
  return (
    <ButtonWithIcon
      size={size}
      onClick={handleGithubSignUp}
      icon={AiOutlineGithub}
      isLoading={loading}
    >
      Sign in with Github
    </ButtonWithIcon>
  );
};

export default GoogleSigninButton;
