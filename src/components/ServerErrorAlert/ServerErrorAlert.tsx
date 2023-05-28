import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

const ServerErrorAlert = ({
  serverError,
}: {
  serverError: string | null;
}): JSX.Element => {
  if (!serverError) {
    return <></>;
  }
  return (
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      <Flex direction="column">
        <AlertTitle>{serverError}</AlertTitle>
        <AlertDescription>
          Check your internet connection or try again later.
        </AlertDescription>
      </Flex>
    </Alert>
  );
};

export default ServerErrorAlert;
