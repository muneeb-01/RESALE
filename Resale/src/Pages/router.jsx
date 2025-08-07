import { createBrowserRouter } from "react-router-dom";
import { Layout, Login, NotFound, Signup, LoginSuccess } from "@/components";
import { AuthRoute, PrivateRoute } from "@/components/validateRoutes";

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
    path: "/sign-up",
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
    element: (
      <PrivateRoute>
        <Layout />,
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
