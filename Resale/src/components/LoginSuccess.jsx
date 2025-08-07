// src/components/LoginSuccess.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { showToast } from "@/components/ToastContainer";
import { LOGIN_REDIRECT } from "@/utils/constants";
import { useAppStore } from "@/Store";
const LoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAppStore();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      setAuth({ accessToken: token, user: null });
      showToast.success("Successfully logged in!");
      navigate(LOGIN_REDIRECT);
    } else {
      showToast.error("Authentication failed. No token received.");
      navigate("/login");
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold">Processing login...</h2>
      </div>
    </div>
  );
};

export default LoginSuccess;
