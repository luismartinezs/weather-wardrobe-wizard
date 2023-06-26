import Head from "next/head";
import { Box, Container, Text } from "@chakra-ui/react";

import SelectLocation from "@/features/location/components/SelectLocation";
import WeatherForecast from "@/features/weather-forecast/components/WeatherForecast";
import ClothingSuggestions from "@/features/clothing-suggestions/components/ClothingSuggestions";
import LocationButton from "@/features/location/components/LocationButton";
import RecentLocations from "@/features/location/components/RecentLocations";
import WeatherAlerts from "@/features/weather-forecast/components/WeatherAlerts";

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
      <Text mb={4} fontSize="xl" color="gray.400">
        I will help you decide what clothes to pack for your trip, based on the
        weather forecast
      </Text>
      <Container px={0}>
        <SelectLocation />
        <Box mt={2}>
          <LocationButton />
        </Box>
      </Container>
      <Box mt={4}>
        <RecentLocations />
      </Box>
      <Box mt={4}>
        <WeatherAlerts />
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
