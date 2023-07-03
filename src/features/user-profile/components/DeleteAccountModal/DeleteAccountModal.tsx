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
import { getAuthError } from "@/firebase/util";
import { useUser } from "@/features/auth/context/User";
import { useTranslation } from "next-i18next";

type FormData = {
  password: string | undefined;
};

const DeleteAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element => {
  const { t } = useTranslation();
  const toast = useToast();
  const { user } = useUser();
  const isPasswordProvider = user?.providerData[0]?.providerId === "password";

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
        <ModalHeader>{t("delete_account")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{t("delete_warning")}</Text>
          {isPasswordProvider && (
            <Box>
              <Text mt={1}>{t("enter_password_confirm")}</Text>
              <FormControl mt={2} isInvalid={!!errors.password}>
                <FormLabel srOnly={true} htmlFor="password">
                  {t("password")}
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("your_password")}
                  {...register("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" variant="ghost" mr={3} onClick={onClose}>
            {t("keep_account")}
          </Button>
          <Button type="submit" colorScheme="red" isLoading={isSubmitting}>
            {t("del_acc_forever")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAccountModal;
