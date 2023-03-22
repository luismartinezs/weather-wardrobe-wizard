import Head from "next/head";
import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";

import SelectLocation from "@/components/SelectLocation";
import WeatherForecast from "@/components/WeatherForecast";
import ClothingSuggestions from "@/components/ClothingSuggestions";
import LocationButton from "@/components/LocationButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather Wardrobe Wizard</title>
        <meta
          name="description"
          content="Get suggestions of clothes to pack based on the weather forecast for the next 5 days"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading
        as="h1"
        bgGradient="linear(160deg, tertiary.500, secondary.500)"
        bgClip="text"
        width="fit-content"
      >
        Weather Wardrobe Wizard
      </Heading>
      <Text mt={2} fontSize="lg">
        I will help you decide what clothes to pack for your trip
      </Text>
      <Divider my={4} />
      <Container>
        <SelectLocation />
        <Box mt={2}>
          <LocationButton />
        </Box>
      </Container>
      <Box mt={8}>
        <WeatherForecast />
      </Box>
      <Box mt={8}>
        <ClothingSuggestions />
      </Box>
    </>
  );
}
