import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/shared/ui/Layout/Layout.tsx";
import LoginPage from "@/pages/login/LoginPage.tsx";
import { routes } from "@/app/providers/router/routes.ts";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: routes.home(), element: <LoginPage /> },
      { path: routes.login(), element: <LoginPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
