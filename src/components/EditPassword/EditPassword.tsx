import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import ServerErrorAlert from "@/components/ServerErrorAlert";
import { useServerError } from "@/hooks/useServerError";
import { editPassword } from "@/firebase/auth";
import { getAuthError } from "@/firebase/util";
import { useAuthUser } from "@/hooks/useAuthUser";

type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  oldPassword: yup.string().min(6).required(),
  newPassword: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required(),
});

const EditPassword = (): JSX.Element => {
  const { user } = useAuthUser();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleEditPassword = async (data: FormData) => {
    if (!user) {
      return;
    }
    const { error } = await editPassword(user, {
      password: data.oldPassword,
      newPassword: data.newPassword,
    });
    toast({
      title: error ? "Oops!" : "Password updated",
      status: error ? "error" : "success",
      description: error ? getAuthError(error) : "",
      duration: 5000,
      isClosable: true,
    });
    if (!error) {
      reset();
    }
  };

  const [handleSubmitWithServerError, serverError] =
    useServerError(handleEditPassword);

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(handleSubmitWithServerError)}
      direction="column"
      gap={4}
    >
      <Heading as="h2" size="md">
        Edit password
      </Heading>
      {serverError && <ServerErrorAlert serverError={serverError} />}
      <FormControl isInvalid={!!errors.oldPassword}>
        <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
        <Input
          id="oldPassword"
          type="password"
          placeholder="Old Password"
          {...register("oldPassword")}
        />
        <FormErrorMessage>{errors.oldPassword?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.newPassword}>
        <FormLabel htmlFor="password">New Password</FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="New Password"
          {...register("newPassword")}
        />
        <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          {...register("confirmPassword")}
        />
        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        isLoading={isSubmitting}
        w={{ base: "100%", md: "200px" }}
        ml="auto"
      >
        Update password
      </Button>
    </Flex>
  );
};

export default EditPassword;
