import { AiOutlineGoogle } from "react-icons/ai";
import ButtonWithIcon, {
  type ButtonWithIconProps,
} from "@/components/ButtonWithIcon";

import { useGoogleSignin } from "@/hooks/useGoogleSignin";

const GoogleSigninButton = ({
  size = "md",
}: Pick<ButtonWithIconProps, "size">): JSX.Element => {
  const { handleGoogleSignUp, loading } = useGoogleSignin();
  return (
    <ButtonWithIcon
      size={size}
      onClick={handleGoogleSignUp}
      icon={AiOutlineGoogle}
      isLoading={loading}
    >
      Sign in with Google
    </ButtonWithIcon>
  );
};

export default GoogleSigninButton;
