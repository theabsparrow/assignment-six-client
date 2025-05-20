"use client";

import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import VerificationField from "./VerificationField";
import { resendOtp } from "@/services/authService";
import { toast } from "sonner";

const VerifyEmail = ({ isEditing }: { isEditing: boolean }) => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = async () => {
    console.log("clicked to open the modal");
    try {
      const res = await resendOtp();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setOpen(true);
        localStorage.setItem("verifyEmailModalOpen", "true");
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const savedState = localStorage.getItem("verifyEmailModalOpen");
    if (savedState === "true") {
      setOpen(true);
    }
  }, [open]);

  return (
    <>
      {isEditing && (
        <div>
          <button
            onClick={handleModalOpen}
            className="px-2 py-1 text-white text-sm  font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition duration-300 rounded-lg shadow-md focus:outline-none cursor-pointer"
          >
            Verify Email
          </button>
        </div>
      )}

      {open && (
        <>
          <div>
            <button
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setOpen(false)}
            ></button>
          </div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-100 dark:bg-gray-900 w-[90%] md:w-[35vw] p-6 rounded-xl shadow-lg relative transition-all duration-300">
              <button
                onClick={() => {
                  setOpen(false);
                  localStorage.removeItem("verifyEmailModalOpen");
                  localStorage.removeItem("otpExpiry");
                }}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                We’ve sent a verification code to your email address. Please
                check your inbox and follow the instructions to verify your
                email.
              </p>

              <VerificationField />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VerifyEmail;
