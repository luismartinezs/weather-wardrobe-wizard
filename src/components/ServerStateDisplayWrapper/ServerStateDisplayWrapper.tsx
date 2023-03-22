import { Flex, Spinner } from "@chakra-ui/react";
import ErrorMessage from "@/components/ErrorMessage";

type ServerStateDisplayWrapperProps<
  Data = any,
  ErrorType extends Error = Error
> = {
  children: React.ReactNode;
  data: Data;
  isLoading: boolean;
  isError?: boolean;
  error?: ErrorType | null;
  errorComponent?: React.ReactNode;
  disableError?: boolean;
  disableLoading?: boolean;
};

const ServerStateDisplayWrapper = <Data, ErrorType extends Error = Error>({
  data,
  isLoading,
  isError,
  error,
  errorComponent = null,
  children,
  disableError,
  disableLoading,
}: ServerStateDisplayWrapperProps<Data, ErrorType>): JSX.Element => {
  if (isLoading) {
    if (disableLoading) {
      return <></>;
    }
    return (
      <Flex w="100%" alignItems="center" justifyContent="center" my={8}>
        <Spinner />
      </Flex>
    );
  }
  if (isError) {
    if (disableError) {
      return <></>;
    }
    return errorComponent ? (
      <>{errorComponent}</>
    ) : (
      <ErrorMessage error={error || new Error("There was an error")} />
    );
  }
  if (!data) {
    return <></>;
  }
  return <>{children}</>;
};

export default ServerStateDisplayWrapper;
