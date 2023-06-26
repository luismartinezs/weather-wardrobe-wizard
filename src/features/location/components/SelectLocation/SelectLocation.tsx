import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  VStack,
  IconButton,
  useId,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { LocationSuggestion } from "@/features/location/types";
import ErrorMessage from "@/components/ErrorMessage";
import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";
import { useSelectLocation } from "@/features/location/hooks/useSelectLocation";

const SelectLocation = (): JSX.Element => {
  const {
    locationQuery,
    locationSuggestions,
    isLoading,
    isLocationSelected,
    handleLocationChange,
    handleLocationSelection,
    isError,
    error,
    handleClearSelectedLocation,
  } = useSelectLocation();

  const { isOpen: isErrorVisible, onClose } = useDisclosure({
    defaultIsOpen: false,
  });
  const errorId = useId();

  function createLocationSuggestionHandler(item: LocationSuggestion) {
    return () => handleLocationSelection(item);
  }

  return (
    <FormControl>
      <FormLabel>
        <Text fontSize="lg" as="span" color="gray.300">
          Where are you going?
        </Text>
      </FormLabel>
      <HStack>
        <Box pos="relative" flex={1}>
          <InputGroup>
            <Input
              placeholder="Enter a location, e.g. Hanoi"
              size="lg"
              value={locationQuery}
              onChange={(event) => handleLocationChange(event.target.value)}
              list="location-suggestions"
              aria-describedby={errorId}
            />
            <InputRightElement m={1}>
              <IconButton
                isDisabled={!locationQuery}
                aria-label="Clear input"
                variant="ghost"
                icon={<CloseIcon />}
                onClick={handleClearSelectedLocation}
              />
            </InputRightElement>
          </InputGroup>
          <VStack
            pos="absolute"
            bg="gray.700"
            width="100%"
            boxShadow="xl"
            spacing={0}
            as="datalist"
            id="location-suggestions"
            zIndex={2}
          >
            <ServerStateDisplayWrapper
              data={locationSuggestions}
              isLoading={isLoading}
              disableError
            >
              {!isLocationSelected &&
                locationSuggestions?.map((item, idx) => (
                  <Box
                    // idx prevents duplicate keys since it is possible that two listed locations have the same lat and lon
                    key={`${item.lat}${item.lon}${idx}`}
                    width="100%"
                    borderBottom={
                      idx < locationSuggestions.length - 1 ? "1px" : 0
                    }
                    borderColor="gray.600"
                  >
                    <Button
                      onClick={createLocationSuggestionHandler(item)}
                      variant="ghost"
                      width="100%"
                      borderRadius={0}
                      justifyContent="flex-start"
                      py={6}
                      px={6}
                      color="gray.300"
                      role="option"
                      fontWeight="light"
                    >
                      <Text color="gray.400">{item.name}&nbsp;</Text>
                      <Text color="gray.500" fontSize="sm" as="span">
                        ({[item.state, item.country].filter(Boolean).join(", ")}
                        )
                      </Text>
                    </Button>
                  </Box>
                ))}
            </ServerStateDisplayWrapper>
          </VStack>
        </Box>
      </HStack>
      {isError && isErrorVisible && (
        <Box mt={2}>
          <ErrorMessage id={errorId} error={error} onClose={onClose} closable />
        </Box>
      )}
    </FormControl>
  );
};

export default SelectLocation;