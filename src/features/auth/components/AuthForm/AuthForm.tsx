import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import ServerErrorAlert from "@/components/ServerErrorAlert";
import { useServerError } from "@/hooks/useServerError";
import { type WithErrorHandling } from "@/firebase/auth";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { getAuthError } from "@/firebase/util";
import { useRouter } from "next/router";
import { useUser } from "@/context/User";

export type FormData = {
  email: string;
  password: string;
  displayName: string | undefined;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  displayName: yup.string().notRequired(),
});

interface AuthFormProps {
  onSubmit: (data: FormData) => ReturnType<ReturnType<WithErrorHandling>>;
  buttonText: string;
  title: string;
  type?: "register" | "signin";
  redirectOnAuth?: string;
}

function AuthForm({
  onSubmit,
  buttonText,
  title,
  type = "signin",
  redirectOnAuth,
}: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading: userLoading, error: userError } = useUser();

  useEffect(() => {
    if (user && redirectOnAuth) {
      router.push(redirectOnAuth);
    }
  }, [user, redirectOnAuth, router]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      setError(null);
    });
    return () => unsubscribe();
  }, [watch]);

  const onSubmitHandler = async (data: FormData) => {
    const res = await onSubmit(data);
    if (res?.error) {
      setError(res.error);
    }
  };

  const [handleSubmitWithServerError, serverError] =
    useServerError(onSubmitHandler);

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(handleSubmitWithServerError)}
      direction="column"
      gap={4}
    >
      <Heading as="h1" size="lg" textAlign="center">
        {title}
      </Heading>
      {serverError && <ServerErrorAlert serverError={serverError} />}
      {userError && <ErrorMessage error={userError} />}
      {type === "register" && (
        <FormControl isInvalid={!!errors.displayName}>
          <FormLabel htmlFor="displayName">Name (optional)</FormLabel>
          <Input id="displayName" {...register("displayName")} />
          <FormErrorMessage aria-live="polite">
            {errors.displayName?.message}
          </FormErrorMessage>
        </FormControl>
      )}
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email (required)</FormLabel>
        <Input id="email" aria-required="true" {...register("email")} />
        <FormErrorMessage aria-live="polite">
          {errors.email?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password (required)</FormLabel>
        <Input
          id="password"
          type="password"
          aria-required="true"
          {...register("password")}
          autoComplete="current-password"
        />
        <FormErrorMessage aria-live="polite">
          {errors.password?.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        w="100%"
        colorScheme="primary"
        type="submit"
        isLoading={isSubmitting || userLoading}
        aria-disabled={isSubmitting || userLoading}
      >
        {buttonText}
      </Button>
      {error && <ErrorMessage error={getAuthError(error)} />}
    </Flex>
  );
}

export default AuthForm;
