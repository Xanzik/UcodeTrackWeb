import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/shared/ui/Layout/Layout.tsx";
import LoginPage from "@/pages/login/LoginPage.tsx";
import { routes } from "@/app/providers/router/routes.ts";
import RegisterPage from "@/pages/register/RegisterPage.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: routes.home(), element: <LoginPage /> },
      { path: routes.login(), element: <LoginPage /> },
      { path: routes.register(), element: <RegisterPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
