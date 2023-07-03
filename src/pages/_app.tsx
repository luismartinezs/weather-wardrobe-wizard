import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { SkipNavLink } from "@chakra-ui/skip-nav";
import { appWithTranslation } from "next-i18next";

import MetaTags from "@/components/MetaTags";
import Layout from "@/components/Layout";
import theme from "@/theme";
import "@/styles/globals.css";
import { UserProvider } from "@/features/auth/context/User";
import { FirebaseProvider } from "@/firebase/context/Firebase";
import { useSW } from "@/hooks/useSW";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  useSW();

  return (
    <>
      <Head>
        <MetaTags />
      </Head>
      <FirebaseProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
              <SkipNavLink>Skip to content</SkipNavLink>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </UserProvider>
      </FirebaseProvider>
    </>
  );
}

export default appWithTranslation(App);
