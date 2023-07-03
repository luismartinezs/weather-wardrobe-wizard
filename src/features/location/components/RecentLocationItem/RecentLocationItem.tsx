import { LocationSuggestion } from "@/features/location/types";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const RecentLocationItem = ({
  location,
  onClick,
  onClose,
}: {
  location: LocationSuggestion;
  onClick: () => void;
  onClose: () => void;
}): JSX.Element => {
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";

  return (
    <Badge
      variant="outline"
      colorScheme="primary"
      borderRadius="md"
      sx={{
        "&:hover": {
          backgroundColor: isLight ? "primary.100" : "primary.900",
        },
      }}
    >
      <Flex justify="center" align="center">
        <Button
          variant="unstyled"
          onClick={onClick}
          height="fit-content"
          py={2}
          pl={2}
          pr={1}
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
