import { type WeatherForecast, getClothingSuggestions } from "@/util/weather";
import { Badge, Flex, Heading, Stack } from "@chakra-ui/react";

const ClothingSuggestions = ({
  forecast,
}: {
  forecast: WeatherForecast[] | null;
}): JSX.Element => {
  if (!forecast) {
    return <></>;
  }

  const suggestions = getClothingSuggestions(forecast);

  return (
    <>
      <Heading as="h2" fontSize="lg" fontWeight="normal">
        Suggested clothing:
      </Heading>
      <Flex mt={2} gap={2} flexWrap="wrap">
        {suggestions.map((el) => (
          <Badge py={1} px={2} key={el}>
            {el}
          </Badge>
        ))}
      </Flex>
    </>
  );
};

export default ClothingSuggestions;
