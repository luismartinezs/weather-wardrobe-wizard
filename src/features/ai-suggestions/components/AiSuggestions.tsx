import OpaqueText from "@/components/OpaqueText";
import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";
import { useUser } from "@/features/auth/context/User";
import PlanPill from "@/features/plans/components/PlanPill";
import useSubscription from "@/features/plans/hooks/useSubscription";
import { useForecastAdapter } from "@/features/weather-forecast/hooks/useForecastAdapter";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useCallableAiSuggestions } from "@/features/ai-suggestions/hooks/useCallableAISuggestions";

const AiSuggestions = (): JSX.Element => {
  const { user } = useUser();
  const { isSubscribed, isPremium } = useSubscription(user);
  const { suggestion, isLoading, error } = useCallableAiSuggestions();
  const { forecast } = useForecastAdapter();

  const heading = (
    <>
      <Flex gap={2} align="center">
        <Heading
          as="h2"
          fontSize="lg"
          fontWeight="thin"
          textTransform="uppercase"
          letterSpacing={1.2}
        >
          Ai powered suggestions
        </Heading>
        <PlanPill>Premium</PlanPill>
        {isSubscribed && isPremium && isLoading && (
          <Text display="block" fontSize={14} color="gray.400">
            (AI doing its thing, give it 1 minute...)
          </Text>
        )}
      </Flex>
    </>
  );

  if (!forecast) {
    return <></>;
  }

  if (!(isSubscribed && isPremium)) {
    return (
      <>
        {heading}
        <Card mt={4} overflow="hidden">
          <CardBody>
            <Box position="relative">
              <Flex
                position="absolute"
                inset={0}
                justify="center"
                align="center"
                zIndex={10}
              >
                <NextLink href="/plans">
                  <Button colorScheme="secondary" boxShadow="xl">
                    Upgrade to Premium
                  </Button>
                </NextLink>
              </Flex>
              <OpaqueText whiteSpace="pre-line" color="gray.300" />
            </Box>
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <>
      {heading}
      <ServerStateDisplayWrapper
        isLoading={isLoading}
        data={suggestion}
        error={error}
        loadingComponent={<Skeleton mt={4} height={20} borderRadius="8px" />}
      >
        <Card mt={4} overflow="hidden">
          <CardBody>
            <Text whiteSpace="pre-line" color="gray.300">
              {suggestion?.content}
            </Text>
          </CardBody>
        </Card>
      </ServerStateDisplayWrapper>
    </>
  );
};

export default AiSuggestions;
