import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import SigninButtons from "@/components/SigninButtons";
import { useAuthContext } from "@/context/AuthContext";
import ProfileLink from "@/components/ProfileLink";
import { useRouteChange } from "@/hooks/useRouteChange";

const links: Array<{
  label: string;
  href: string;
  requireGuest?: boolean;
}> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Sign in",
    href: "/signin",
    requireGuest: true,
  },
];

const Links = () => {
  const { user } = useAuthContext();
  return (
    <>
      {links
        .filter(({ requireGuest }) => {
          if (requireGuest && user) {
            return false;
          }
          return true;
        })
        .map(({ label, href }) => (
          <Link as={NextLink} href={href} key={href}>
            {label}
          </Link>
        ))}
    </>
  );
};

const ResponsiveNav = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();
  useRouteChange(() => isOpen && onClose(), [isOpen, onClose]);

  return (
    <>
      <Box display={{ base: "block", xl: "none" }} onClick={onOpen}>
        <IconButton
          icon={<HamburgerIcon />}
          variant="outline"
          aria-label="Open Menu"
        />
      </Box>

      <Box
        display={{ base: "none", xl: "block" }}
        flexBasis={{ base: "100%", xl: "auto" }}
      >
        <Flex align="center" gap="5">
          <Links />
          {user && <ProfileLink user={user} />}
        </Flex>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={{ base: "full", md: "md" }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt={10}>
            <Flex justify="center">
              <Image
                src="https://res.cloudinary.com/dicyllvry/image/upload/a_hflip/v1684923223/weather-wardrobe-wizard/cute-seal-wizard_xpxfvw.png"
                alt="Cute wizard seal"
                width={150}
                height={150}
              />
            </Flex>
            {user && (
              <Text fontWeight="normal" fontSize="md" align="center">
                Welcome {user.displayName}!
              </Text>
            )}
          </DrawerHeader>

          <DrawerBody>
            <Flex
              align="center"
              direction="column"
              gap="5"
              fontSize="2xl"
              px={6}
            >
              <Links />
              {user && <ProfileLink user={user} />}
              <SigninButtons direction="column" />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Box textAlign="center" fontSize="sm">
              © 2023 Weather Wardrobe Wizard
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ResponsiveNav;
