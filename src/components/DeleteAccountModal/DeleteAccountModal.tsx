import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteAccount } from "@/firebase/auth";
import useStore from "@/store";
import { getAuthError } from "@/firebase/util";
import { useUser } from "@/context/userContext";

type FormData = {
  password?: string;
};

const DeleteAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element => {
  const toast = useToast();
  const { user } = useUser();
  const isPasswordProvider = useStore(
    (state) => state.user?.providerData[0]?.providerId === "password"
  );

  const schema = yup.object().shape({
    password: yup.string().test("password", "Password is required", (value) => {
      if (isPasswordProvider && !value) return false;
      return true;
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleDeleteAccount = handleSubmit(async ({ password }) => {
    if (!user) {
      return;
    }

    const { error } = await deleteAccount(user, { password });

    if (error) {
      toast({
        title: "Oops!",
        description: getAuthError(error),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleDeleteAccount}>
        <ModalHeader>Delete acccount</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            After your account is deleted, all your data will be lost.
          </Text>
          {isPasswordProvider && (
            <Box>
              <Text mt={1}>
                Enter your password to confirm you want to delete.
              </Text>
              <FormControl mt={2} isInvalid={!!errors.password}>
                <FormLabel srOnly={true} htmlFor="password">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  {...register("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" variant="ghost" mr={3} onClick={onClose}>
            Keep account
          </Button>
          <Button type="submit" colorScheme="red" isLoading={isSubmitting}>
            Delete account forever
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAccountModal;
