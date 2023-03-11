import { Container } from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Container maxW="container.xl" my={6}>
      {children}
    </Container>
  );
};

export default Layout;
