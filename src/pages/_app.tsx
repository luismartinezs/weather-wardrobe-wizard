import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { SkipNavLink } from "@chakra-ui/skip-nav";

import MetaTags from "@/components/MetaTags";
import Layout from "@/components/Layout";
import theme from "@/theme";
import "@/styles/globals.css";
import { useAuthUser } from "@/hooks/useAuthUser";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { loading } = useAuthUser();
  return (
    <>
      <Head>
        <MetaTags />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          {loading ? (
            <Flex w="100%" justify="center" align="center" my={8}>
              <Spinner />
            </Flex>
          ) : (
            <>
              <SkipNavLink>Skip to content</SkipNavLink>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </>
          )}
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
