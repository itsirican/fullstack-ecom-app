import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interface";
import { addItemsToShoppingCart } from "../../utils/functions";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

interface ICartItems {
  cartItems: IProduct[];
}

const initialState: ICartItems = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setcartItemsAction: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = addItemsToShoppingCart(state.cartItems, action.payload);
    },
    removeFromCartAction: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    setClearCartItemsAction: (state) => {
      state.cartItems = [];
      toast({
        title: "Your cart is empty now.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  },
});

export const {
  setcartItemsAction,
  removeFromCartAction,
  setClearCartItemsAction,
} = cartSlice.actions;
export default cartSlice.reducer;
