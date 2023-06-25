import { Box, Container, Flex, Spinner, useToast } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser } from "@/context/User";
import ErrorMessage from "../ErrorMessage";
import { useFirebaseMessaging } from "@/hooks/useFirebaseMessaging";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { loading, error } = useUser();
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
    <Flex minH="100vh" direction="column">
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
      <Box bg="gray.900" position="absolute" bottom={0} w="100%" as="footer">
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
