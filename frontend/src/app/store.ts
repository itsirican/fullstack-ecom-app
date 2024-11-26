import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import { useDispatch } from "react-redux";
import cartSlice from "./features/cartSlice";
import cartDrawerSlice from "./features/cartDrawerSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import apiSlice from "./services/apiSlice";

const persistCartConfig = {
  key: "cart",
  storage,
};
const persistedCart = persistReducer(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    cart: persistedCart,
    login: loginSlice,
    cartDrawer: cartDrawerSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
