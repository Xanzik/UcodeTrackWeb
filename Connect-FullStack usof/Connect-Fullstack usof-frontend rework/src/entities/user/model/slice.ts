import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/entities/user";
import { logout } from "@/entities/auth/model/slice.ts";

type UserState = {
  user: IUser | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.user = null;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
