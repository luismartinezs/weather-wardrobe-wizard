import { useState } from "react";
import Head from "next/head";
import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";

import { LocationSuggestion } from "@/types/weatherApi";
import SelectLocation from "@/components/SelectLocation";
import WeatherForecast from "@/components/WeatherForecast";

export default function Home() {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationSuggestion | null>(null);

  return (
    <>
      <Head>
        <title>Weather Wardrobe Wizard</title>
        <meta
          name="description"
          content="Get suggestions of clothes to pack based on the weather forecast for the
        next 5 days"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1">Weather Wardrobe Wizard</Heading>
      <Text mt={2}>
        Get suggestions of clothes to pack based on the weather forecast for the
        next 5 days
      </Text>
      <Divider my={4} />
      <Container>
        <SelectLocation onChange={setSelectedLocation} />
      </Container>
      <Box mt={2}>
        <WeatherForecast location={selectedLocation} />
      </Box>
    </>
  );
}
