import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import { useDispatch } from "react-redux";
import cartSlice from "./features/cartSlice";
import cartDrawerSlice from "./features/cartDrawerSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsApiSlice from "./services/products";
import categoriesApiSlice from "./services/categories";
import networkSlice from "./features/networkSlice";

const persistCartConfig = {
  key: "cart",
  storage,
};
const persistedCart = persistReducer(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    network: networkSlice,
    cart: persistedCart,
    login: loginSlice,
    cartDrawer: cartDrawerSlice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat([productsApiSlice.middleware, categoriesApiSlice.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
