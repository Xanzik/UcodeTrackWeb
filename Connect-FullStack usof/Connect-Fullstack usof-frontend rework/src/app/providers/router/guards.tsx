import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { routes } from "@/app/providers/router/routes.ts";

function useAuth() {
  return { isAuth: false };
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Navigate to={routes.login()} replace />;
  }
  return children;
}

export function RequireGuest({ children }: { children: ReactNode }) {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Navigate to={routes.home()} replace />;
  }
  return children;
}
