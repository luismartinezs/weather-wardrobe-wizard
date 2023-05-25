import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { SkipNavLink } from "@chakra-ui/skip-nav";

import { AuthContextProvider } from "@/context/AuthContext";
import MetaTags from "@/components/MetaTags";
import Layout from "@/components/Layout";
import theme from "@/theme";
import "@/styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <MetaTags />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <SkipNavLink>Skip to content</SkipNavLink>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthContextProvider>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
