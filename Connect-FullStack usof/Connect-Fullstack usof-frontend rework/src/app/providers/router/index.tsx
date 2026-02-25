import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/app/providers/router/routes";
import { RegisterPage } from "@/pages/Register/RegisterPage";
import { RequireGuest } from "@/app/providers/router/guards";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { Layout } from "@/app/layouts/Layout";
import { LoginPage } from "@/pages/Login";
import { ActivateAccountPage } from "@/pages/ActivateAccount";
import { HomePage } from "@/pages/Home";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
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
  {
    element: <Layout />,
    children: [
      {
        path: routes.home.path,
        element: <HomePage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
