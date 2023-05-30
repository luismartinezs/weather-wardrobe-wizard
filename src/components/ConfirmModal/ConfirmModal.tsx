import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmAction: (...args: any[]) => void;
  onClose: () => void;
  cancelAction?: () => void;
};

const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmAction,
  cancelAction,
  onClose,
}: Props): JSX.Element => {
  let _cancelAction = cancelAction;
  if (!cancelAction) {
    _cancelAction = onClose;
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{description}</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={_cancelAction}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
