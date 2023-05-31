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
  description: string | JSX.Element;
  confirmAction?: (...args: any[]) => void;
  onClose: () => void;
  cancelAction?: () => void;
  confirmButton?: JSX.Element;
  cancelButton?: JSX.Element;
  confirmLabel?: string;
  cancelLabel?: string;
};

const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmAction,
  cancelAction,
  onClose,
  confirmButton,
  cancelButton,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: Props): JSX.Element => {
  let _cancelAction = cancelAction;
  if (!cancelAction) {
    _cancelAction = onClose;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{description}</ModalBody>

        <ModalFooter>
          {cancelButton || (
            <Button variant="ghost" mr={3} onClick={_cancelAction}>
              {cancelLabel}
            </Button>
          )}
          {confirmButton || (
            <Button onClick={confirmAction}>{confirmLabel}</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
