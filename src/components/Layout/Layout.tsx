import { Box, Container, Stack } from "@chakra-ui/react";

import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Stack minH="100vh">
      <Container maxW="container.xl" mt={6} mb={28}>
        {children}
      </Container>
      <Box bg="gray.900" position='absolute' bottom={0} w="100%" >
        <Footer />
      </Box>
    </Stack>
  );
};

export default Layout;
