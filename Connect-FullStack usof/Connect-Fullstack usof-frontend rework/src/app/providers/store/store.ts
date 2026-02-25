import { configureStore } from "@reduxjs/toolkit";
import { authApi, authReducer } from "@/entities/auth";
import { userReducer } from "@/entities/user";
import { postApi } from "@/entities/post/api/postApi.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (gdm) =>
    gdm().concat(authApi.middleware).concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
