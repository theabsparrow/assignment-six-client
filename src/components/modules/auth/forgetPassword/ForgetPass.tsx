"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputType from "../../formInput/InputType";
import { SearchWithEmailResult } from "@/services/authService";
import { TUSerRole } from "@/types";
import ResetPassword from "./ResetPassword";
import { useRouter } from "next/navigation";
type FormValues = {
  email: string;
};
export type TUSerWithEmail = {
  email: string;
  userInfo: {
    phone: string;
    password: string;
    role: TUSerRole;
    name: string;
    profileImage: string;
  };
};

const ForgetPass = () => {
  const [emailPage, setEmailPage] = useState(false);
  const [user, setUser] = useState<Partial<TUSerWithEmail> | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  // useEffect(() => {
  //   const otpForm = localStorage.getItem("forgetPass");
  //   if (otpForm) {
  //     setEmailPage(true);
  //   } else {
  //     setEmailPage(false);
  //   }
  // }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await SearchWithEmailResult(data);
      if (res?.success) {
        setUser(res?.data);
        setEmailPage(true);
        // localStorage.setItem("forgetPass", "forgetPassForm");
        reset();
      } else {
        setUser(null);
        reset();
        router.push("/no-user");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {emailPage && user ? (
        <section>
          <ResetPassword userInfo={user} />
        </section>
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-12 ">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 transition-all">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
              Forgot Password
            </h2>
            <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
              Enter your registered email address to receive an OTP.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <InputType
                  label="Email"
                  name="email"
                  register={register}
                  error={errors.email}
                  type="email"
                  required={true}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition cursor-pointer"
              >
                {isSubmitting ? "Searching" : "Search"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPass;
