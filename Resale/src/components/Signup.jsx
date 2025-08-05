import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "./ui/FormField";
import SocialLoginButtons from "./ui/SocialLoginButtons";
import { authServices } from "@/api/services/authervices";
import { showToast } from "@/components/ToastContainer";
import { OTPInput } from "@/components";
import { handleSocialLogin } from "@/utils/functions";
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true); // Disable button
    try {
      const response = await authServices.register({
        email: data.email,
        password: data.password,
      });
      console.log(response);
      setRegisteredEmail(data.email);
      setShowOTPInput(true); // Show OTP input on successful registration
      reset(); // Reset form
    } catch (error) {
      showToast("error", "Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  return (
    <div className="min-h-screen select-none flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {showOTPInput ? (
          <OTPInput email={registeredEmail} /> // Pass email to OTPInput
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
              Sign Up
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
              <FormField
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                register={register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                error={errors.confirmPassword}
              />
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 sm:py-2.5 rounded-md hover:bg-blue-700 transition duration-200 text-sm sm:text-base ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
            <SocialLoginButtons handleSocialLogin={handleSocialLogin} />
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
