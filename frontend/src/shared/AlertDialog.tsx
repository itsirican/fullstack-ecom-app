import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  cancelTxt?: string;
  okTxt?: string;
  variant?: "ghost" | "link" | "outline" | "solid" | "unstyled";
  isLoading: boolean;
  onOkHandler: () => void;
}

function CustomAlertDialog({
  isOpen,
  onClose,
  title,
  description,
  cancelTxt = "Cancel",
  okTxt = "Ok",
  variant = "solid",
  isLoading,
  onOkHandler,
}: IProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelTxt}
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              variant={variant}
              isLoading={isLoading}
              onClick={() => onOkHandler()}
            >
              {okTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
export default CustomAlertDialog;
