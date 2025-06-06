"use client";

import { verifyEmail } from "@/services/profileService";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import OtpTimer, { OtpTimerHandle } from "../OtpComponent/OtpTimer";
import { resendOtp } from "@/services/authService";

const VerificationField = () => {
  const [otpNum, setOtpNum] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const timerRef = useRef<OtpTimerHandle>(null);

  useEffect(() => {
    const allFilled = otpNum.every((digit) => digit !== "");
    setIsDisabled(!allFilled);
  }, [otpNum]);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtpNum(pastedData.split(""));
      pastedData.split("").forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = char;
        }
      });
      inputRefs.current[5]?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpNum];
    newOtp[index] = value;
    setOtpNum(newOtp);
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && otpNum[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOTP = async () => {
    try {
      const res = await resendOtp();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setIsExpired(false);
        timerRef.current?.reset();
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      otp: otpNum.join(""),
    };
    try {
      const res = await verifyEmail(data);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });

        localStorage.removeItem("customerForm");
        setIsExpired(true);
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="  flex items-center justify-center bg-gray-100 dark:bg-gray-900  mt-4">
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl px-6 py-3 relative space-y-4">
        <div>
          <OtpTimer ref={timerRef} setIsExpired={setIsExpired} />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white ">
          Verify With OTP
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Enter the 6-digit code sent to your email address.
        </p>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center gap-3 sm:gap-4">
            {otpNum.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg text-xl sm:text-2xl font-bold text-center border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary transition"
              />
            ))}
          </div>

          {/* Button Group */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              disabled={isDisabled}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              Verify OTP
            </button>
          </div>
        </form>

        {/* Resend Section */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center">
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Didn’t receive a code?
          </span>
          <button
            onClick={resendOTP}
            disabled={!isExpired}
            className={`px-4 py-1.5 rounded-full text-sm sm:text-base font-semibold transition duration-300
      ${
        isExpired
          ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
      }`}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationField;
