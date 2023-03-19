import NextLink from "next/link";
import { baseTheme, Box, Circle, HStack, Link, Text } from "@chakra-ui/react";

function Triangle({ size = 15 }: { size?: number }) {
  return (
    <Box
      w={0}
      h={0}
      borderLeft={`${size}px solid transparent`}
      borderRight={`${size}px solid transparent`}
      borderTop={`${size}px solid white`}
      transform="translate(8%, -8%) rotate(-90deg)"
    />
  );
}

const AmazonLink = ({
  url,
  label = "Buy at Amazon",
}: {
  url: string;
  label?: string;
}): JSX.Element => {
  return (
    <Link
      as={NextLink}
      href={url}
      isExternal
      bg="linear-gradient(0deg, #DDAA2E 0%, #FFE789 100%)"
      display="block"
      mx="auto"
      w="fit-content"
      pl={4}
      pr={1}
      py={1}
      color="#2b254b"
      borderRadius={30}
      borderColor="primary.900"
      shadow={baseTheme.shadows.md}
      borderWidth={3}
      fontWeight="bold"
      whiteSpace="nowrap"
      _hover={{
        textDecoration: "none",
        background: "linear-gradient(0deg, #FFE789 0%, #DDAA2E 100%)",
        shadow: baseTheme.shadows.lg,
      }}
    >
      <HStack>
        <Text as="span">{label}</Text>
        <Circle
          size="30px"
          bg="linear-gradient(200deg, #9494BF 30%, #020139 70%)"
        >
          <Triangle size={7} />
        </Circle>
      </HStack>
    </Link>
  );
};

export default AmazonLink;
