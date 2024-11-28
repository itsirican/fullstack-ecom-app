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
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onOkHandler: () => void;
  title: string;
  okTxt?: string;
  cancelTxt?: string;
  children: ReactNode;
  isLoading: boolean;
}

const CustomModel = ({
  isOpen,
  onClose,
  title,
  okTxt = "Done",
  cancelTxt = "Close",
  children,
  onOkHandler,
  isLoading,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            {cancelTxt}
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            onClick={onOkHandler}
          >
            {okTxt}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModel;
