import { Button, useDisclosure } from "@chakra-ui/react";

import DeleteAccountModal from "@/components/DeleteAccountModal";

const DeleteAccount = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickHandler = () => {
    onOpen();
  };

  return (
    <>
      <Button colorScheme="red" onClick={onClickHandler}>
        Delete account
      </Button>
      <DeleteAccountModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default DeleteAccount;
