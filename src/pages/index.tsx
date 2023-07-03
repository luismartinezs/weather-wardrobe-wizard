import Head from "next/head";
import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

import SelectLocation from "@/features/location/components/SelectLocation";
import WeatherForecast from "@/features/weather-forecast/components/WeatherForecast";
import ClothingSuggestions from "@/features/clothing-suggestions/components/ClothingSuggestions";
import LocationButton from "@/features/location/components/LocationButton";
import RecentLocations from "@/features/location/components/RecentLocations";
import WeatherAlerts from "@/features/weather-forecast/components/WeatherAlerts";
import AiSuggestions from "@/features/ai-suggestions/components/AiSuggestions";

export { commonGetServerSideProps as getServerSideProps } from "@/utils/commonGetServerSideProps";

export default function Home() {
  const { t } = useTranslation();
  const description = useColorModeValue("gray.600", "gray.400");

  return (
    <>
      <Head>
        <title>{t("app_title")}</title>
        <meta name="description" content={t("app_description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Text mb={4} fontSize="xl" color={description}>
        {t("home_help_text")}
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
      <Box mt={8}>
        <AiSuggestions />
      </Box>
    </>
  );
}
