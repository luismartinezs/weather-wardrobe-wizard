import { HamburgerIcon } from "@chakra-ui/icons";
import { BsStars } from "react-icons/bs";
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
  Spinner,
  Icon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import ProfileLink from "@/features/user-profile/components/ProfileLink";
import { useRouteChange } from "@/hooks/useRouteChange";
import { useRouter } from "next/router";
import { useUser } from "@/features/auth/context/User";
import useSubscription from "@/features/plans/hooks/useSubscription";
import { IconType } from "react-icons";
import { Subscription } from "@stripe/firestore-stripe-payments";
import SubscriptionPill from "@/features/plans/components/SubscriptionPill";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "next-i18next";
import ThemeButton from "@/components/ThemeButton";

const getLinks = (options: {
  subscription?: Subscription | null;
  t: (key: string) => string;
}): Array<{
  label: string;
  href: string;
  icon?: IconType;
  iconColor?: string;
  requireGuest?: boolean;
  redirect?: boolean;
}> => {
  const isSubscribed = ["active", "trialing"].includes(
    options?.subscription?.status || ""
  );
  const { t } = options;

  return [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("plans"),
      href: "/plans",
      icon: !isSubscribed ? BsStars : undefined,
      iconColor: "gold",
    },
    {
      label: t("sign_in"),
      href: "/signin",
      requireGuest: true,
      redirect: true,
    },
  ];
};

const Links = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { subscription } = useSubscription(user);
  const { pathname } = useRouter();

  return (
    <>
      {getLinks({ subscription, t })
        .filter(({ requireGuest }) => {
          if (requireGuest && user) {
            return false;
          }
          return true;
        })
        .map(({ label, href, redirect, icon, iconColor }) => {
          let _href = href;
          if (redirect && pathname !== href) {
            _href = `${_href}?redirect=${pathname}`;
          }
          return (
            <Link as={NextLink} href={_href} key={href}>
              <Flex align="center" gap="1">
                {icon && <Icon as={icon} boxSize={6} color={iconColor} />}
                <Text as="span">{label}</Text>
              </Flex>
            </Link>
          );
        })}
    </>
  );
};

const ResponsiveNav = (): JSX.Element => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, loading } = useUser();
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
        <Flex align="center" gap={6}>
          <Links />
          {loading ? <Spinner /> : user && <ProfileLink user={user} />}
          <SubscriptionPill />
          <LanguageSwitcher />
          <ThemeButton />
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
                {t("welcome")} {user.displayName || user.email}!
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
              <Flex align="center" gap={2}>
                {loading ? (
                  <Spinner />
                ) : (
                  user && <ProfileLink user={user} label={t("profile")} />
                )}
                <SubscriptionPill />
              </Flex>
              <Flex align="center" gap={4}>
                <LanguageSwitcher />
                <ThemeButton
                  buttonProps={{
                    size: "lg",
                  }}
                />
              </Flex>
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
