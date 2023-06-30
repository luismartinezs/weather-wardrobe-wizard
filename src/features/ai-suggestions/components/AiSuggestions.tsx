import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";
import { useAiSuggestions } from "@/features/ai-suggestions/hooks/useAiSuggestions";
import { useUser } from "@/features/auth/context/User";
import PlanPill from "@/features/plans/components/PlanPill";
import useSubscription from "@/features/plans/hooks/useSubscription";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

const AiSuggestions = (): JSX.Element => {
  const { user } = useUser();
  const { isSubscribed, isPremium } = useSubscription(user);
  const { suggestion, isLoading } = useAiSuggestions();
  return (
    <ServerStateDisplayWrapper
      isLoading={isLoading}
      data={suggestion}
      disableError
      disableLoading
    >
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
      </Flex>
      <Card mt={4} overflow="hidden">
        <CardBody>
          <Text
            whiteSpace="pre-line"
            color="gray.300"
            filter={isSubscribed && isPremium ? "" : "blur(10px)"}
          >
            {suggestion}
          </Text>
        </CardBody>
        <CardFooter pt={0} justify="end">
          <Text fontSize={14} color="gray.400">
            Powered by OpenAI
          </Text>
        </CardFooter>
      </Card>
    </ServerStateDisplayWrapper>
  );
};

export default AiSuggestions;
