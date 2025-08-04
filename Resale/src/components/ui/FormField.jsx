import React from "react";

const FormField = ({ label, type, placeholder, register, error }) => (
  <div>
    <label className="block cursor-pointer text-sm sm:text-base font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      {...register}
      className={`mt-1 w-full px-3 py-2 sm:px-4 sm:py-2.5 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
      placeholder={placeholder}
    />
    {error && (
      <p className="mt-1 text-xs sm:text-sm text-red-500">{error.message}</p>
    )}
  </div>
);

export default FormField;
