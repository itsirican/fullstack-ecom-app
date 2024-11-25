import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interface";
import { addItemsToShoppingCart } from "../../utils/functions";

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
  },
});

export const { setcartItemsAction } = cartSlice.actions;
export default cartSlice.reducer;
