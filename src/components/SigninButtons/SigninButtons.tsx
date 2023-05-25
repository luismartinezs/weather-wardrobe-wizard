import { useAuthContext } from "@/context/AuthContext";
import { Flex, type FlexProps } from "@chakra-ui/react";
import GithubSigninButton from "../GithubSigninButton";
import GoogleSigninButton from "../GoogleSigninButton";
import SignoutButton from "../SignoutButton";

const SigninButtons = ({
  direction = "row",
}: {
  direction?: FlexProps["direction"];
}): JSX.Element => {
  const { user } = useAuthContext();

  return (
    <Flex direction={direction} gap={2}>
      {user ? (
        <SignoutButton />
      ) : (
        <>
          <GoogleSigninButton />
          <GithubSigninButton />
        </>
      )}
    </Flex>
  );
};

export default SigninButtons;
