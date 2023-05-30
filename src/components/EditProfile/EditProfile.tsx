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
import { editProfile } from "@/firebase/auth";
import { useAuthContext } from "@/context/AuthContext";
import ServerErrorAlert from "@/components/ServerErrorAlert";
import { useServerError } from "@/hooks/useServerError";

type FormData = {
  email: string;
  displayName?: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  displayName: yup.string(),
});

const EditProfile = (): JSX.Element => {
  const { user, refreshUser } = useAuthContext();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email || "",
      displayName: user?.displayName || "",
    },
  });

  const onSubmitHandler = async (data: FormData) => {
    if (!user) {
      return;
    }
    if (data.email === user.email && data.displayName === user.displayName) {
      return;
    }
    const { error } = await editProfile(user, data);
    if (!error) {
      await refreshUser();
    }
    toast({
      title: error ? "There was an error" : "Profile updated",
      status: error ? "error" : "success",
      duration: 5000,
      isClosable: true,
    });
    return;
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
      <Heading as="h2" size="md">
        Edit profile
      </Heading>
      {serverError && <ServerErrorAlert serverError={serverError} />}
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.displayName}>
        <FormLabel htmlFor="displayName">Display Name</FormLabel>
        <Input
          id="displayName"
          type="text"
          placeholder="Display Name"
          {...register("displayName")}
        />
        <FormErrorMessage>{errors.displayName?.message}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        isLoading={isSubmitting}
        w={{ base: "100%", md: "200px" }}
        ml="auto"
      >
        Update profile
      </Button>
    </Flex>
  );
};

export default EditProfile;
