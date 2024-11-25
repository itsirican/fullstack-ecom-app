import { createSlice } from "@reduxjs/toolkit";

interface IDrawerState {
  isOpenDrawer: boolean;
}

const initialState: IDrawerState = {
  isOpenDrawer: false,
};

export const cartDrawerSlice = createSlice({
  name: "cartDrawer",
  initialState,
  reducers: {
    setOnOpenDrawerAction: (state) => {
      state.isOpenDrawer = true;
    },
    setOnCloseDrawerAction: (state) => {
      state.isOpenDrawer = false;
    },
  },
});

export default cartDrawerSlice.reducer;
export const { setOnOpenDrawerAction, setOnCloseDrawerAction } =
  cartDrawerSlice.actions;
