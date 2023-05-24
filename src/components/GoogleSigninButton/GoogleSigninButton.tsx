import { AuthContext } from "@/context/AuthContext";
import { googleSignUp, signOut } from "@/firebase/auth";
import { useContext, useState } from "react";
import { Button, Icon, type ButtonProps } from "@chakra-ui/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

import { useGoogleSignin } from "./useGoogleSignin";

type GoogleSigninButtonProps = {
  size?: ButtonProps["size"];
};

const iconSizeMap: Record<string, number> = {
  default: 6,
  sm: 4,
  md: 5,
  lg: 6,
};

const GoogleSigninButton = ({
  size = "md",
}: GoogleSigninButtonProps): JSX.Element => {
  const { user } = useContext(AuthContext);
  const { handleGoogleSignUp, loading } = useGoogleSignin();

  const iconSize = iconSizeMap[typeof size === "string" ? size : "default"];

  return (
    <>
      {user ? (
        <Button
          size={size}
          variant="outline"
          onClick={signOut}
          leftIcon={<Icon boxSize={iconSize} as={BiLogOut} />}
        >
          Sign out
        </Button>
      ) : (
        <Button
          size={size}
          variant="outline"
          onClick={handleGoogleSignUp}
          className="google-signup"
          leftIcon={<Icon boxSize={iconSize} as={AiOutlineGoogle} />}
          isLoading={loading}
        >
          Sign in with Google
        </Button>
      )}
    </>
  );
};

export default GoogleSigninButton;
