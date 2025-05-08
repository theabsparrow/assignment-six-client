"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NoUser = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 text-center transition-all">
        <div className="flex justify-center mb-4 text-red-600 dark:text-red-400">
          <FaExclamationTriangle className="text-5xl" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          User Not Found
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
          We couldn’t find a user with that email address. Please check your
          input and try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/forgot-password"
            className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Try Again
          </Link>
          <Link
            href="/login"
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoUser;
