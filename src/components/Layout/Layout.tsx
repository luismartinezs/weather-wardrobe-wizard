import {
  Box,
  Container,
  Flex,
  Spinner,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser } from "@/features/auth/context/User";
import ErrorMessage from "../ErrorMessage";
import { useFirebaseMessaging } from "@/firebase/hooks/useFirebaseMessaging";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { loading, error } = useUser();
  const bg = useColorModeValue("gray.100", "gray.900");
  const footerBg = useColorModeValue("gray.50", "gray.900");
  const toast = useToast();
  useFirebaseMessaging((payload) => {
    toast({
      title: payload?.notification?.title,
      description: payload?.notification?.body,
      status: "info",
      duration: 8000,
      isClosable: true,
    });
  });

  return (
    <Flex minH="100vh" direction="column" bg={bg}>
      <Header />
      <Container
        as="main"
        maxW={{
          base: "container.sm",
          md: "container.md",
          xl: "container.xl",
        }}
        mt={6}
        mb={28}
      >
        <SkipNavContent />
        {error && (
          <Box mb={4}>
            <ErrorMessage error={error} />
          </Box>
        )}
        {loading ? (
          <Flex w="100%" justify="center" align="center" my={8}>
            <Spinner />
          </Flex>
        ) : (
          children
        )}
      </Container>
      <Box bg={footerBg} position="absolute" bottom={0} w="100%" as="footer">
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
