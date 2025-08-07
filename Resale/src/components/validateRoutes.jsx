import { useAppStore } from "@/Store";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const { accessToken } = useAppStore();
  const isAuthRoute = !!accessToken;
  return isAuthRoute ? <Navigate to="/" /> : children;
};

export const PrivateRoute = ({ children }) => {
  const { accessToken } = useAppStore();
  const isAuthRoute = accessToken;

  return isAuthRoute ? children : <Navigate to="/sign-up" />;
};
