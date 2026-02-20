import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { routes } from "@/app/providers/router/routes.ts";
import { useAppSelector } from "@/app/hooks";

function useAuth() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  return { isAuth: Boolean(accessToken) };
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuth } = useAuth();
  if (!isAuth) {
    return <Navigate to={routes.login.path} replace />;
  }
  return children;
}

export function RequireGuest({ children }: { children: ReactNode }) {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Navigate to={routes.home.path} replace />;
  }
  return children;
}
