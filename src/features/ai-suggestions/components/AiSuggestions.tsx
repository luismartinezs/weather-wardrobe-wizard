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
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useCallableAiSuggestions } from "@/features/ai-suggestions/hooks/useCallableAISuggestions";
import { useTranslation } from "next-i18next";

const lorem =
  "Enim reprehenderit aliqua veniam fugiat mollit sunt proident aute. Labore anim proident nulla commodo enim eiusmod incididunt ex. Duis irure officia velit anim in consequat veniam consequat exercitation. Minim in enim anim aliquip aliquip amet commodo laboris fugiat aliqua laboris laboris Lorem irure. Lorem nulla ea excepteur cupidatat ut pariatur irure ad excepteur ad pariatur amet eu. Elit veniam laborum ullamco duis elit laboris. Esse excepteur irure fugiat est eu officia amet enim ex occaecat irure proident Lorem ut.\n\nReprehenderit do deserunt quis fugiat. Voluptate in ex exercitation non ex pariatur sit voluptate. Incididunt veniam nisi dolor aliquip qui aliquip amet elit.";

const shortLorem =
  "Culpa ullamco Lorem tempor proident. Nostrud sunt consequat commodo dolor sit excepteur do eiusmod do nostrud consectetur exercitation voluptate. Enim nostrud enim reprehenderit culpa elit sit in dolore nisi non tempor.";

const AiSuggestions = (): JSX.Element => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { isSubscribed, isPremium } = useSubscription(user);
  const { suggestion, isLoading, error } = useCallableAiSuggestions();
  const { forecast } = useForecastAdapter();
  const [isMobile] = useMediaQuery("(max-width: 650px)");

  const heading = (
    <>
      <Flex gap={2} align="center" wrap="wrap" mb={4}>
        <Flex gap={2} align="center">
          <Heading
            as="h2"
            fontSize="lg"
            fontWeight="thin"
            textTransform="uppercase"
            letterSpacing={1.2}
          >
            {t("ai_powered_suggestions")}
          </Heading>
          <PlanPill>{t("premium_plan")}</PlanPill>
        </Flex>
        {isSubscribed && isPremium && isLoading && (
          <Text display="block" fontSize={14} color="gray.400">
            ({t("ai_thinking")})
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
                    {t("upgrade_to_premium")}
                  </Button>
                </NextLink>
              </Flex>
              <OpaqueText
                whiteSpace="pre-line"
                color="gray.300"
                text={isMobile ? shortLorem : lorem}
              />
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
        loadingComponent={<Skeleton height={20} borderRadius="8px" />}
      >
        <Card overflow="hidden">
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
