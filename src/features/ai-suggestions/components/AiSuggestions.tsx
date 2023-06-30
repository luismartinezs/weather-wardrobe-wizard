import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";
import { useAiSuggestions } from "@/features/ai-suggestions/hooks/useAiSuggestions";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";

const AiSuggestions = (): JSX.Element => {
  const { suggestion, isLoading } = useAiSuggestions();
  return (
    <ServerStateDisplayWrapper
      isLoading={isLoading}
      data={suggestion}
      disableError
      disableLoading
    >
      <Heading
        as="h2"
        fontSize="lg"
        fontWeight="thin"
        textTransform="uppercase"
        letterSpacing={1.2}
      >
        Ai powered suggestions
      </Heading>
      <Card mt={2}>
        <CardBody>
          <Text whiteSpace="pre-line" color="gray.300">
            {suggestion}
          </Text>
        </CardBody>
      </Card>
    </ServerStateDisplayWrapper>
  );
};

export default AiSuggestions;
