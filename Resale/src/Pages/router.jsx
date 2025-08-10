import { createBrowserRouter } from "react-router-dom";
import { Layout, Login, NotFound, Signup, LoginSuccess } from "@/components";
import { AuthRoute, PrivateRoute } from "@/components/validateRoutes";
import LandingPage from "@/Pages/Landing/LandingPage";
import { AppLayout } from "@/Pages/app/Components";
import AppHome from "@/Pages/app/AppHome";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />,
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <Signup />,
      </AuthRoute>
    ),
  },
  {
    path: "/login/success",
    element: (
      <AuthRoute>
        <LoginSuccess />
      </AuthRoute>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "/app",
        element: <AppHome />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
