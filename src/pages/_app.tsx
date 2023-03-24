import Head from "next/head";
import { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "@/components/Layout";
import theme from "@/theme";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Get suggestions of clothes to pack based on the weather forecast for the next 5 days"
        />
        <meta
          name="keywords"
          content="weather, wardrobe, wizard, clothing, forecast, outfit, recommendation, app, location-based, fashion, temperature, rain, sunshine, local, dressing, attire, style, adaptive"
        />
        <title>Weather Wardrobe Wizard</title>
        <meta name="application-name" content="Weather Wardrobe Wizard" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Weather Wardrobe Wizard"
        />

        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#3182ce"
        />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#317EFB" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://weatherwardrobewizard.com" />
        <meta name="twitter:title" content="Weather Wardrobe Wizard" />
        <meta name="twitter:description" content="Weather Wardrobe Wizard" />
        <meta
          name="twitter:image"
          content="https://weatherwardrobewizard.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@LuisMartinezSu2" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Weather Wardrobe Wizard" />
        <meta property="og:description" content="Weather Wardrobe Wizard" />
        <meta property="og:site_name" content="Weather Wardrobe Wizard" />
        <meta property="og:url" content="https://weatherwardrobewizard.com" />
        <meta
          property="og:image"
          content="https://weatherwardrobewizard.com/icons/apple-touch-icon.png"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
