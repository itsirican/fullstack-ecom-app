import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { setOnCloseDrawerAction } from "../app/features/cartDrawerSlice";
import { RootState } from "../app/store";
import { setClearCartItemsAction } from "../app/features/cartSlice";

const CartDrawer = () => {
  const btnRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { isOpenDrawer } = useSelector((state: RootState) => state.cartDrawer);
  // ** Handlers:
  const onCloseHandler = () => dispatch(setOnCloseDrawerAction());
  const onClearAllHandler = () => {
    dispatch(setClearCartItemsAction());
    onCloseHandler();
  };

  return (
    <>
      <Drawer
        isOpen={isOpenDrawer}
        placement="right"
        onClose={onCloseHandler}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              colorScheme="red"
              onClick={onClearAllHandler}
            >
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
