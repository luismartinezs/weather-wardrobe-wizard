import { Flex, Heading, Link } from "@chakra-ui/react";
import Image from "next/image";
import ResponsiveNav from "@/components/ResponsiveNav";
import NextLink from "next/link";

const Header = () => {
  return (
    <>
      <Flex
        as="header"
        align={{ base: "start", lg: "center" }}
        justify="space-between"
        wrap="nowrap"
        padding="1rem"
        color="white"
      >
        <Flex align="center">
          <Link as={NextLink} href="/" display={{ base: "none", lg: "block" }}>
            <Image
              src="https://res.cloudinary.com/dicyllvry/image/upload/a_hflip/v1684923223/weather-wardrobe-wizard/cute-seal-wizard_xpxfvw.png"
              alt="Cute wizard seal"
              width={150}
              height={150}
            />
          </Link>
          <Flex align="start" flexDirection="column" mr={5}>
            <Link
              as={NextLink}
              href="/"
              sx={{
                _hover: {
                  textDecoration: "none",
                },
              }}
            >
              <Heading
                as="h1"
                bgGradient="linear(160deg, tertiary.500, secondary.500)"
                bgClip="text"
                width="fit-content"
                fontSize={{ base: "2xl", md: "5xl" }}
              >
                Weather Wardrobe Wizard
              </Heading>
            </Link>
          </Flex>
        </Flex>

        <ResponsiveNav />
      </Flex>
    </>
  );
};

export default Header;
