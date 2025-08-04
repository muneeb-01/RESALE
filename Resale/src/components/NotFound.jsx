import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center section px-4 sm:px-6 lg:px-8">
      <div className=" p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
          404 - Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
