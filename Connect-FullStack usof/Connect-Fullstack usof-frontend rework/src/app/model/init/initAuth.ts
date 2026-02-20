import type { AppDispatch } from "@/app/providers/store";
import { authApi } from "@/entities/auth/api/authApi";
import { logout } from "@/entities/auth/model/slice";

export async function initAuth(dispatch: AppDispatch) {
  try {
    await dispatch(authApi.endpoints.refresh.initiate()).unwrap();
  } catch {
    dispatch(logout());
  }
}
