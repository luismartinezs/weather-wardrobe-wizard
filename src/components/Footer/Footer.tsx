import {Container, Link} from "@chakra-ui/react";

const Footer = (): JSX.Element => {
  return (
      <Container color="gray.400" py={6} maxW="2xl">
        <small>
          Created by <Link fontWeight={800} href="https://www.luis-martinez.net/" isExternal>Luis Martinez</Link>
        </small>
      </Container>
  );
};

export default Footer
