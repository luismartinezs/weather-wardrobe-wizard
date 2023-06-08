import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";

import SelectLocation from "@/components/SelectLocation";
import WeatherForecast from "@/components/WeatherForecast";
import ClothingSuggestions from "@/components/ClothingSuggestions";
import LocationButton from "@/components/LocationButton";
import RecentLocations from "@/components/RecentLocations";

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
      </Head>
      <Container>
        <SelectLocation />
        <Box mt={2}>
          <LocationButton />
        </Box>
      </Container>
      <Box mt={4}>
        <RecentLocations />
      </Box>
      <Box mt={8}>
        <WeatherForecast />
      </Box>
      <Box mt={8}>
        <ClothingSuggestions />
      </Box>
    </>
  );
}
