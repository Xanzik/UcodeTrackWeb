import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/shared/ui/Layout/Layout.tsx";
import LoginPage from "@/pages/login/LoginPage.tsx";
import { routes } from "@/app/providers/router/routes.ts";
import RegisterPage from "@/pages/register/RegisterPage.tsx";
import { RequireAuth, RequireGuest } from "@/app/providers/router/guards.tsx";
import ActivateAccountPage from "@/pages/activate-account/ActivateAccountPage.tsx";
import HomePage from "@/pages/home/HomePage.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: routes.home.path,
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },
      {
        path: routes.login.path,
        element: (
          <RequireGuest>
            <LoginPage />
          </RequireGuest>
        ),
      },
      {
        path: routes.register.path,
        element: (
          <RequireGuest>
            <RegisterPage />
          </RequireGuest>
        ),
      },
      {
        path: routes.activateAccount.path,
        element: (
          <RequireGuest>
            <ActivateAccountPage />
          </RequireGuest>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
