import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { type User } from "firebase/auth";
import NextLink from "next/link";
import { BiUserCircle } from "react-icons/bi";

const ProfileLink = ({ user }: { user: User }): JSX.Element => {
  return (
    <Link as={NextLink} href="/profile">
      <Flex align="center" gap="2" mr="4">
        <Icon as={BiUserCircle} boxSize={6} />
        <Text>{user.displayName}</Text>
      </Flex>
    </Link>
  );
};

export default ProfileLink;
