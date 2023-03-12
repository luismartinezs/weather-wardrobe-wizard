import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useDisclosure,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import debounce from "lodash.debounce";

import { useId } from "@/util/hooks";
import { LocationSuggestion } from "@/types/weatherApi";
import ErrorMessage from "@/components/ErrorMessage";
import { fetchErrorHandler } from "@/util/dataFetch";

function fetchLocationSuggestions(
  query: string
): Promise<LocationSuggestion[]> {
  return fetchErrorHandler(
    `/api/geocoding?query=${query}`,
    "There was an error trying to get location suggestions. Try again."
  );
}

const SelectLocation = ({
  onChange,
}: {
  onChange: (value: LocationSuggestion) => void;
}): JSX.Element => {
  const [locationQuery, setLocationQuery] = useState("");
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({
    defaultIsOpen: false,
  });
  const errorId = useId();
  const [isSelected, setIsSelected] = useState(false);

  const {
    data: locationSuggestions,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<LocationSuggestion[], Error>(
    ["getLocationSuggestions", locationQuery],
    () => {
      onOpen();
      return fetchLocationSuggestions(locationQuery);
    },
    {
      enabled: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsSelected(false);
    const _locationQuery = e.target.value;
    setLocationQuery(_locationQuery);
    if (!_locationQuery || _locationQuery.length < 2) {
      return;
    }
    debounce(() => refetch({ cancelRefetch: true }), 500)();
  }

  function handleLocationSuggestionClick(item: LocationSuggestion) {
    setLocationQuery(item.name);
    setIsSelected(true);
    onChange(item);
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
            {isLoading ? (
              <Spinner color="gray.400" my={4} />
            ) : (
              !isSelected &&
              locationSuggestions &&
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
                    onClick={() => handleLocationSuggestionClick(item)}
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
                      ({[item.state, item.country].filter(Boolean).join(", ")})
                    </Text>
                  </Button>
                </Box>
              ))
            )}
          </VStack>
        </Box>
      </HStack>
      {isError && isVisible && (
        <Box mt={2}>
          <ErrorMessage id={errorId} error={error} onClose={onClose} closable />
        </Box>
      )}
    </FormControl>
  );
};

export default SelectLocation;
