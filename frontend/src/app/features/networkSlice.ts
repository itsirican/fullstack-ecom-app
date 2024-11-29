import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOnlineState {
  isOnline: boolean;
}

const initialState: IOnlineState = {
  isOnline: true,
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    // ** Actions
    setIsOnlineAction: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setIsOnlineAction } = networkSlice.actions;
export default networkSlice.reducer;
