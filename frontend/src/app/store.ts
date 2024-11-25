import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import { useDispatch } from "react-redux";
import cartSlice from "./features/cartSlice";
import cartDrawerSlice from "./features/cartDrawerSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: cartSlice,
    cartDrawer: cartDrawerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
