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

export type FormData = {
  email: string;
  password: string;
  displayName?: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  displayName: yup.string(),
});

interface AuthFormProps {
  onSubmit: (data: FormData) => void;
  buttonText: string;
  title: string;
  type: "register" | "signin";
}

function AuthForm({
  onSubmit,
  buttonText,
  title,
  type = "signin",
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      gap={4}
    >
      <Heading as="h1" size="lg" textAlign="center">
        {title}
      </Heading>
      {type === "register" && (
        <FormControl isInvalid={!!errors.displayName}>
          <FormLabel htmlFor="displayName">Display Name</FormLabel>
          <Input id="displayName" {...register("displayName")} />
          <FormErrorMessage>{errors.displayName?.message}</FormErrorMessage>
        </FormControl>
      )}
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email (required)</FormLabel>
        <Input id="email" {...register("email")} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password (required)</FormLabel>
        <Input id="password" type="password" {...register("password")} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button
        w="100%"
        colorScheme="primary"
        type="submit"
        isLoading={isSubmitting}
      >
        {buttonText}
      </Button>
    </Flex>
  );
}

export default AuthForm;
