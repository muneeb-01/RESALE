import { useAppStore } from "@/Store";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const { accessToken } = useAppStore();
  const token = accessToken || localStorage.getItem("accessToken");
  const isAuthenticated = !!token;
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export const PrivateRoute = ({ children }) => {
  const { accessToken } = useAppStore();
  const token = accessToken || localStorage.getItem("accessToken");
  const isAuthenticated = !!token;
  return isAuthenticated ? children : <Navigate to="/sign-up" />;
};
