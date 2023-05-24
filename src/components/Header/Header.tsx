import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import ResponsiveNav from "@/components/ResponsiveNav";

const Header = () => {
  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="nowrap"
        padding="1rem"
        color="white"
      >
        <Flex align="center">
          <Box display={{ base: "none", lg: "block" }}>
            <Image
              src="https://res.cloudinary.com/dicyllvry/image/upload/a_hflip/v1684923223/weather-wardrobe-wizard/cute-seal-wizard_xpxfvw.png"
              alt="Cute wizard seal"
              width={150}
              height={150}
            />
          </Box>
          <Flex align="start" flexDirection="column" mr={5}>
            <Heading
              as="h1"
              bgGradient="linear(160deg, tertiary.500, secondary.500)"
              bgClip="text"
              width="fit-content"
              fontSize={{ base: "2xl", md: "5xl" }}
            >
              Weather Wardrobe Wizard
            </Heading>
            <Text mt={2} fontSize="lg" color="gray.400">
              I will help you decide what clothes to pack for your trip
            </Text>
          </Flex>
        </Flex>

        <ResponsiveNav />
      </Flex>
    </>
  );
};

export default Header;
