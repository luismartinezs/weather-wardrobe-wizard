import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Custom404() {
  return (
    <>
      <Heading as="h1" fontSize="medium" fontWeight="normal">
        404 - Page Not Found
      </Heading>
      <Link as={NextLink} href="/" display="inline-block" mt={2}>
        Go to home
      </Link>
    </>
  );
}
