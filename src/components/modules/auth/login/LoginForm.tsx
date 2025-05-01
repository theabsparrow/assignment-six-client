"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginFormInput from "../../formInput/LoginFormInput";
import { TLogin } from "@/types/loginTypes";
import { getCurrentUser, loginUser } from "@/services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

type FormValues = {
  identifier: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
  });
  const { setIsLoading, setUser } = useUser();
  const [redirect, setRedirect] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setRedirect(searchParams.get("redirectPath"));
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const userInput = data.identifier.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput);
    const finalPayload: TLogin = {
      ...(isEmail ? { email: userInput } : { phone: userInput }),
      password: data?.password,
    };
    try {
      const res = await loginUser(finalPayload);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        if (redirect) {
          router.push(redirect);
          reset();
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setIsLoading(false);
        } else {
          router.push("/");
          reset();
        }
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-200 dark:bg-gray-900 rounded-2xl shadow-xl text-gray-800 dark:text-white md:mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Login you account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full"></div>
        <LoginFormInput
          label="Email or Phone"
          name="identifier"
          placeholder="enter your valid email or phone"
          register={register}
          error={errors.identifier}
          type="text"
          required={true}
        />
        <LoginFormInput
          label="Password"
          name="password"
          placeholder="enter your password"
          register={register}
          error={errors.password}
          type="password"
          required={true}
        />
        <button
          type="submit"
          className="w-full bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition cursor-pointer"
        >
          {isSubmitting ? "Logging in" : "Login"}
        </button>
      </form>
      <div className="flex gap-2 items-center mt-2">
        <h1>New to this site? Please</h1>
        <Link className="text-blue-700" href="/register">
          {" "}
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
