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

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={rest.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
