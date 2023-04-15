import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Button,
} from "@chakra-ui/react";

interface ModalComponentProps extends ModalProps {
  modalTitle: string;
}

function ModalComponent(props: ModalComponentProps) {
  const { modalTitle, children, ...rest } = props;
  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
