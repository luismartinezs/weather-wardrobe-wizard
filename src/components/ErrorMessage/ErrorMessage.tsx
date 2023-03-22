import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  HStack,
} from "@chakra-ui/react";

interface ErrorMessageProps<ErrorType extends Error = Error> {
  error: ErrorType | string;
  id?: string;
  onClose?: () => void;
  closable?: boolean;
}

function ErrorMessage<ErrorType extends Error>({
  error,
  id,
  onClose,
  closable,
}: ErrorMessageProps<ErrorType>): JSX.Element {
  return (
    <Alert status="error" id={id}>
      <HStack>
        <AlertIcon />
        <AlertDescription>
          {typeof error === "string" ? error : error?.message}
        </AlertDescription>
      </HStack>
      {closable && (
        <CloseButton
          alignSelf="flex-start"
          ml="auto"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      )}
    </Alert>
  );
}

export default ErrorMessage;
