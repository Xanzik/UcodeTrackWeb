import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./types";

const initialState: AuthState = {
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    logout(state) {
      state.accessToken = null;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
