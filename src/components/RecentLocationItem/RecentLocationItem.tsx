import { LocationSuggestion } from "@/types/weatherApi";
import { CloseIcon } from "@chakra-ui/icons";
import { Badge, Button, Flex, IconButton, Text } from "@chakra-ui/react";

const RecentLocationItem = ({
  location,
  onClick,
  onClose,
}: {
  location: LocationSuggestion;
  onClick: () => void;
  onClose: () => void;
}): JSX.Element => {
  return (
    <Badge
      variant="outline"
      colorScheme="primary"
      borderRadius="md"
      pl={3}
      pr={2}
      sx={{
        "&:hover": {
          backgroundColor: "primary.900",
        },
      }}
    >
      <Flex justify="center" align="center">
        <Button
          variant="unstyled"
          onClick={onClick}
          height="fit-content"
          py={2}
        >
          <Text fontSize="medium" fontWeight="normal">
            {location.name}
          </Text>
        </Button>
        <IconButton
          height="fit-content"
          py={1}
          size="sm"
          variant="unstyled"
          onClick={onClose}
          aria-label={`Remove ${location.name}`}
          icon={<CloseIcon />}
        />
      </Flex>
    </Badge>
  );
};

export default RecentLocationItem;
