import { Button, useDisclosure } from "@chakra-ui/react";

import DeleteAccountModal from "@/features/user-profile/components/DeleteAccountModal";
import { useTranslation } from "next-i18next";

const DeleteAccount = (): JSX.Element => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickHandler = () => {
    onOpen();
  };

  return (
    <>
      <Button colorScheme="red" onClick={onClickHandler}>
        {t("delete_account")}
      </Button>
      <DeleteAccountModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default DeleteAccount;
