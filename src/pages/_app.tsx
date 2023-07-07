import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SkipNavLink } from "@chakra-ui/skip-nav";
import { appWithTranslation } from "next-i18next";

import MetaTags from "@/components/MetaTags";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { UserProvider } from "@/features/auth/context/User";
import { FirebaseProvider } from "@/firebase/context/Firebase";
import { useSW } from "@/hooks/useSW";
import { Chakra } from "@/providers/Chakra";
import Loader from "@/components/Loader";
import { useRouteLoading } from "@/hooks/useRouteLoading";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const isLoading = useRouteLoading();
  useSW();

  return (
    <>
      <Head>
        <MetaTags />
      </Head>
      <FirebaseProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Chakra cookies={pageProps.cookies}>
              {isLoading && <Loader />}
              <SkipNavLink>Skip to content</SkipNavLink>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Chakra>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </UserProvider>
      </FirebaseProvider>
    </>
  );
}

export default appWithTranslation(App);
