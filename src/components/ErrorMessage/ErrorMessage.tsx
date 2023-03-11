import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  HStack,
} from "@chakra-ui/react";

const ErrorMessage = ({
  error,
  id,
  onClose,
  closable,
}: {
  error: Error;
  id?: string;
  onClose?: () => void;
  closable?: boolean;
}): JSX.Element => {
  return (
    <Alert status="error" id={id}>
      <HStack>
        <AlertIcon />
        <AlertDescription>{error?.message}</AlertDescription>
      </HStack>
      {closable && (
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      )}
    </Alert>
  );
};

export default ErrorMessage;
