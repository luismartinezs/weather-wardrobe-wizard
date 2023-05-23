import { useState, useCallback } from "react";

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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import debounce from "lodash.debounce";

import { useId } from "@/util/hooks";
import { LocationSuggestion } from "@/types/weatherApi";
import ErrorMessage from "@/components/ErrorMessage";
import useStore from "@/store";
import { useLocation } from "@/hooks/useLocation";
import ServerStateDisplayWrapper from "@/components/ServerStateDisplayWrapper";

interface UseLocationReturnType {
  data: LocationSuggestion[] | null;
  isLoading: boolean;
  refetch: (options?: { cancelRefetch: boolean }) => void;
  isError: boolean;
  error: Error | null;
}

const SelectLocation = (): JSX.Element => {
  const selectedLocation = useStore((state) => state.selectedLocation);
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);

  const [locationQuery, setLocationQuery] = useState(
    selectedLocation?.name || ""
  );
  const {
    data: locationSuggestions,
    isLoading,
    refetch,
    isError,
    error,
  } = useLocation({ locationQuery }) as UseLocationReturnType;

  const {
    isOpen: isErrorVisible,
    onClose,
    onOpen,
  } = useDisclosure({
    defaultIsOpen: false,
  });
  const errorId = useId();
  const [isSelected, setIsSelected] = useState(!!selectedLocation);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(
    debounce(() => {
      onOpen();
      refetch({ cancelRefetch: true });
    }, 500),
    [onOpen, refetch]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsSelected(false);
    const _locationQuery = e.target.value;
    setLocationQuery(_locationQuery);
    if (!_locationQuery || _locationQuery.length < 2) {
      return;
    }
    debouncedRefetch();
  }

  function createLocationSuggestionHandler(item: LocationSuggestion) {
    return function handleLocationSuggestionClick() {
      setLocationQuery(item.name);
      setIsSelected(true);
      setSelectedLocation(item);
    };
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
              onChange={handleChange}
              list="location-suggestions"
              aria-describedby={errorId}
            />
            <InputRightElement m={1}>
              <IconButton
                isDisabled={!locationQuery}
                aria-label="Clear input"
                variant="ghost"
                icon={<CloseIcon />}
                onClick={() => {
                  setIsSelected(false);
                  setLocationQuery("");
                }}
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
              {!isSelected &&
                locationSuggestions?.map((item, idx) => (
                  <Box
                    key={`${item.lat}${item.lon}`}
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
