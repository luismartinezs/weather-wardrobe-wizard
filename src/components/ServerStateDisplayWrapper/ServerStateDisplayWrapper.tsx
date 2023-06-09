import {
  Flex,
  Spinner,
  useToast,
  Skeleton,
  SkeletonProps,
} from "@chakra-ui/react";
import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";

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
  errorAsToast?: boolean;
  showLoadingSkeleton?: boolean;
  toastOptions?: Parameters<typeof useToast>[0];
  skeletonProps?: SkeletonProps;
  loadingComponent?: React.ReactNode;
};

const ServerStateDisplayWrapper = <Data, ErrorType extends Error = Error>({
  data,
  isLoading,
  isError,
  error,
  errorComponent = null,
  loadingComponent = null,
  children,
  disableError,
  disableLoading,
  errorAsToast,
  showLoadingSkeleton,
  toastOptions,
  skeletonProps = {
    height: "20px",
    width: "100%",
  },
}: ServerStateDisplayWrapperProps<Data, ErrorType>): JSX.Element => {
  const toast = useToast();
  const _isError = isError || !!error;

  useEffect(() => {
    if (_isError && errorAsToast) {
      toast({
        title: "An error occurred",
        description: error?.message || "Unexpected error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        ...toastOptions,
      });
    }
  }, [_isError, errorAsToast, error, toast, toastOptions]);

  if (isLoading) {
    if (disableLoading) {
      return <></>;
    }
    if (showLoadingSkeleton) {
      return <Skeleton {...skeletonProps} />;
    }
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <Flex w="100%" alignItems="center" justifyContent="center" my={8}>
        <Spinner />
      </Flex>
    );
  }
  if (_isError) {
    if (disableError || errorAsToast) {
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
