import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser } from "@/context/userContext";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { loading } = useUser();

  if (loading) {
    return (
      <Flex w="100%" justify="center" align="center" my={8}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Container as="main" maxW="container.xl" mt={6} mb={28}>
        <SkipNavContent />
        {children}
      </Container>
      <Box bg="gray.900" position="absolute" bottom={0} w="100%" as="footer">
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
