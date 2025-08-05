import { createBrowserRouter } from "react-router-dom";
import { Layout, Login, NotFound, Signup, OTPInput } from "@/components";

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
    path: "/",
    element: <Layout />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
