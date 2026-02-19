import { configureStore } from "@reduxjs/toolkit";
import { authApi, authReducer } from "@/entities/auth";
import { userReducer } from "@/entities/user";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (gdm) => gdm().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
