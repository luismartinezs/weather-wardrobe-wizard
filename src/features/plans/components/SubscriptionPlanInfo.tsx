import { useUser } from "@/features/auth/context/User";
import useSubscription from "../hooks/useSubscription";
import { Product } from "@stripe/firestore-stripe-payments";
import {
  Box,
  Button,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatTimestamp } from "@/utils/time";
import { useState } from "react";
import { goToBillingPortal } from "@/firebase/payments";
import { useTranslation } from "next-i18next";

const SubscriptionPlanInfo = ({ plan }: { plan?: Product }): JSX.Element => {
  const { t } = useTranslation();
  const [isBillingLoading, setBillingLoading] = useState(false);
  const { user } = useUser();
  const { subscription, isSubscribed, isTrial } = useSubscription(user);
  const _isSubscribed =
    !!subscription && (plan ? subscription.role === plan.role : isSubscribed);
  const _trialEndDate = subscription?.trial_end;
  const mutedText = useColorModeValue("gray.500", "gray.400");
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";

  const manageSubscription = () => {
    if (subscription) {
      setBillingLoading(true);
      goToBillingPortal();
    }
  };

  if (!_isSubscribed) {
    return <></>;
  }

  return (
    <Box textAlign="left">
      <Text mt={4} color={mutedText}>
        {t("currently_subscribed_to_plan", {
          role: subscription.role,
        })}
        {subscription.cancel_at_period_end && subscription.cancel_at && (
          <>
            {t("until")} {formatTimestamp(subscription.cancel_at)}
          </>
        )}
      </Text>
      {isTrial && _trialEndDate && (
        <Text color={mutedText}>
          {t("currently_on_trial")} {formatTimestamp(_trialEndDate)}
        </Text>
      )}
      <Button
        fontWeight="normal"
        color={mutedText}
        textDecoration="underline"
        onClick={manageSubscription}
        variant="link"
        display="inline"
        isLoading={isBillingLoading}
        _hover={{
          color: isLight ? "black" : "white",
        }}
      >
        {t("click_here_to_mod_subs")}
      </Button>
    </Box>
  );
};

export default SubscriptionPlanInfo;
