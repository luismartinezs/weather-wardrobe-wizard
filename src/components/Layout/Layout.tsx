import { Box, Container } from "@chakra-ui/react";

import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <Container maxW="container.xl" my={6}>
        {children}
      </Container>
      <Box mt={10} bg="gray.900" >
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
