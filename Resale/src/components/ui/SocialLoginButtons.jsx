import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";

const SocialLoginButtons = ({ handleSocialLogin }) => (
  <div className="mt-4 sm:mt-6">
    <p className="text-center text-xs sm:text-sm text-gray-600">
      Or continue with
    </p>
    <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200 text-sm sm:text-base w-full sm:w-auto"
      >
        <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        Google
      </button>
    </div>
  </div>
);

export default SocialLoginButtons;
