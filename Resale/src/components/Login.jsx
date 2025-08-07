import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "./ui/FormField";
import SocialLoginButtons from "./ui/SocialLoginButtons";
import { authServices } from "@/api/services/authervices";
import { handleSocialLogin } from "@/utils/functions";
import { useAppStore } from "@/Store";
import { LOGIN_REDIRECT } from "@/utils/constants";

const Login = () => {
  const { setAuth } = useAppStore();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await authServices.login(data);
      console.log(response);
      setAuth({
        accessToken: response?.data?.accessToken,
        user: response?.data?.user,
      });
      navigate(LOGIN_REDIRECT);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen select-none flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4"
        >
          <FormField
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={errors.email}
          />
          <FormField
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 sm:py-2.5 rounded-md hover:bg-blue-700 transition duration-200 text-sm sm:text-base ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        <SocialLoginButtons handleSocialLogin={handleSocialLogin} />
      </div>
    </div>
  );
};

export default Login;
