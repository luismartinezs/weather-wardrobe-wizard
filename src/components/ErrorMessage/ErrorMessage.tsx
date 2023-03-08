import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  HStack,
} from "@chakra-ui/react";

const ErrorMessage = ({
  id,
  onClose,
  error,
}: {
  id: string;
  onClose: () => void;
  error: Error;
}): JSX.Element => {
  return (
    <Alert status="error" id={id}>
      <HStack>
        <AlertIcon />
        <AlertDescription>{error?.message}</AlertDescription>
      </HStack>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
};

export default ErrorMessage;
