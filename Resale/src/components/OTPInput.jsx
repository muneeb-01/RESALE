import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { authServices } from "@/api/services/authervices";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_REDIRECT } from "@/utils/constants";

const OTPInput = ({ email, setShowOTPInput }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });
  const inputRefs = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const otpValues = watch("otp");

  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setValue("otp", newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").split("").slice(0, 6);
    if (paste.every((char) => /^[0-9]$/.test(char))) {
      setValue("otp", paste);
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };

  const onSubmit = async (data) => {
    const otpValue = data.otp.join("");
    if (otpValue.length === 6) {
      try {
        setIsSubmitting(true);
        const { status } = await authServices.verifyOTP({ email, otpValue });
        if (status === 200) navigate(SIGN_UP_REDIRECT);
      } catch (error) {
        console.error("OTP verification failed:", error);
        setShowOTPInput(false);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex select-none flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <FaLock className="text-blue-500 text-2xl mr-2" />
          <h2 className="text-2xl font-bold text-center">OTP Verification</h2>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your device
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center gap-2 mb-6">
            {otpValues.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                {...register(`otp.${index}`, {
                  required: "This field is required",
                  pattern: {
                    value: /^[0-9]$/,
                    message: "Enter a valid digit",
                  },
                })}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : null}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-12 h-12 text-center text-2xl border-2 rounded-md focus:outline-none ${
                  errors.otp?.[index]
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-500 text-center text-sm">
              {errors.otp[0]?.message || "Please enter a valid OTP"}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPInput;
