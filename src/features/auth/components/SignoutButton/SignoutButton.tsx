import { BiLogOut } from "react-icons/bi";
import { signOut } from "@/firebase/auth";
import ButtonWithIcon, {
  type ButtonWithIconProps,
} from "@/components/ButtonWithIcon";

const SignoutButton = ({
  size = "md",
}: Pick<ButtonWithIconProps, "size">): JSX.Element => {
  return (
    <ButtonWithIcon size={size} onClick={signOut} icon={BiLogOut}>
      Sign out
    </ButtonWithIcon>
  );
};

export default SignoutButton;
