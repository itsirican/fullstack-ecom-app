import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IDataResponse,
  ILoginCredentials,
  IErrorResponse,
} from "../../interface";
import axiosInstance from "../../config/axiox.config";
import { createStandaloneToast } from "@chakra-ui/react";

interface IUserState {
  loading: boolean;
  data: IDataResponse | null;
  error: IErrorResponse | null;
}

const initialState: IUserState = {
  loading: false,
  data: null,
  error: null,
};

const { toast } = createStandaloneToast();

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (credentials: ILoginCredentials, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // console.log(credentials);
      const { data } = await axiosInstance.post("/api/auth/local", credentials);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        toast({
          title: "Logged in successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload as IErrorResponse;
        toast({
          title: "Invalid identifier or password.",
          description: "Make sure you have the correct Email or Password.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  },
});
export default loginSlice.reducer;
