import { createBrowserRouter } from "react-router-dom";
import { Layout, Login, NotFound, Signup, LoginSuccess } from "@/components";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login/success",
    element: <LoginSuccess />,
  },
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
