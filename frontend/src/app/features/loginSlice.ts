import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IDataResponse,
  ILoginCredentials,
  IErrorResponse,
} from "../../interface";
import axiosInstance from "../../config/axiox.config";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieService from "../../services/CookieService";

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
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<IDataResponse>) => {
          state.loading = false;
          state.data = action.payload;
          toast({
            title: "Logged in successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          const date = new Date();
          const IN_DAYS = 5;
          const IN_HOURS = 1000 * 60 * 60 * 24;

          const EXPIRES_IN_DAYS = IN_HOURS * IN_DAYS;

          date.setTime(date.getTime() + EXPIRES_IN_DAYS);
          const options = { path: "/", expires: date, httpOnly: false };
          CookieService.set("jwt", action.payload.jwt, options);
          CookieService.set("id", action.payload.user.id, options);
          setTimeout(() => {
            location.replace("/dashboard");
          }, 2000);
        }
      )
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
