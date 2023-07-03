import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";
import { IncomingMessage } from "http";

import theme from "@/theme";

export function Chakra({
  cookies,
  children,
}: {
  cookies: string;
  children: React.ReactNode;
}) {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
}

export function getServerSideProps({ req }: { req: IncomingMessage }) {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
}
