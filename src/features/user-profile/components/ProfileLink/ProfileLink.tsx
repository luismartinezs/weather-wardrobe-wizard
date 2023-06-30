import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { type User } from "firebase/auth";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";

const ProfileLink = ({
  user,
  label,
}: {
  user: User;
  label?: string;
}): JSX.Element => {
  const [displayLabel, setDisplayLabel] = useState("");

  // NOTE attempt to fix hydration error
  useEffect(() => {
    setDisplayLabel(label || user.displayName || user.email || "");
  }, [label, user]);

  return (
    <Link as={NextLink} href="/profile">
      <Flex align="center" gap="2">
        <Icon as={BiUserCircle} boxSize={6} color="gray.400" />
        <Text as="span">{displayLabel}</Text>
      </Flex>
    </Link>
  );
};

export default ProfileLink;
