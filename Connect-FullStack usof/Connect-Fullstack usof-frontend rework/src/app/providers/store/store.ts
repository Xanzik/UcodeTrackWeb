import { configureStore } from "@reduxjs/toolkit";
import { authApi, authReducer } from "@/entities/auth";
import { userReducer } from "@/entities/user";
import { categoryApi } from "@/entities/category";
import { postApi } from "@/entities/post";
import { userApi } from "@/entities/user/api/userApi.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (gdm) =>
    gdm()
      .concat(authApi.middleware)
      .concat(postApi.middleware)
      .concat(categoryApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
