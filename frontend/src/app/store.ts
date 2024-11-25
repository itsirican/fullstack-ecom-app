import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import { useDispatch } from "react-redux";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
