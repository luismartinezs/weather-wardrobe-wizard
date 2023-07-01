import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";
import { useAiSuggestions } from "@/features/ai-suggestions/hooks/useAiSuggestions";
import { useUser } from "@/features/auth/context/User";
import PlanPill from "@/features/plans/components/PlanPill";
import useSubscription from "@/features/plans/hooks/useSubscription";
import { useForecastAdapter } from "@/features/weather-forecast/hooks/useForecastAdapter";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";

const AiSuggestions = (): JSX.Element => {
  const { user } = useUser();
  const { isSubscribed, isPremium } = useSubscription(user);
  const { suggestion, isLoading, error } = useAiSuggestions();
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

  return (
    <>
      {heading}
      <ServerStateDisplayWrapper
        isLoading={isLoading}
        data={suggestion}
        error={error}
        loadingComponent={<Skeleton mt={4} height={20} />}
      >
        <Card mt={4} overflow="hidden">
          <CardBody>
            <Text
              whiteSpace="pre-line"
              color="gray.300"
              filter={isSubscribed && isPremium ? "" : "blur(10px)"}
            >
              {suggestion?.content}
            </Text>
          </CardBody>
        </Card>
      </ServerStateDisplayWrapper>
    </>
  );
};

export default AiSuggestions;
