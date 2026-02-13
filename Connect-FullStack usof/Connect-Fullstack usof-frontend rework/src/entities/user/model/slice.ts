import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserDTO } from "./types";

type UserState = {
  auth: null | {
    user: UserDTO;
    accessToken?: string;
  };
};

const initialState: UserState = {
  auth: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{ user: UserDTO; accessToken?: string }>,
    ) {
      state.auth = {
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    },
    clearAuth(state) {
      state.auth = null;
    },
  },
});

export const { setAuth, clearAuth } = userSlice.actions;
export const userReducer = userSlice.reducer;
