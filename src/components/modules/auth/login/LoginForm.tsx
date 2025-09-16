"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import LoginFormInput from "../../formInput/LoginFormInput";
import { TLogin } from "@/types/loginTypes";
import { getCurrentUser, loginUser } from "@/services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { TUSerRole } from "@/types";

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
  } = useForm<FormValues>();
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
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setIsLoading(false);
          reset();
        } else {
          router.push("/profile");
          reset();
        }
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLoginAUto = async (role: TUSerRole) => {
    const loginData: Partial<TLogin> = {};
    if (role === "customer") {
      loginData.email = "bashar@outlook.com";
      loginData.password = "Bashar15@";
    }
    if (role === "mealProvider") {
      loginData.email = "brandon@gmail.com";
      loginData.password = "Abul15@";
    }
    if (role === "admin") {
      loginData.email = "bashar@gmail.com";
      loginData.password = "Bashar15@";
    }
    const loadingId = toast.loading("user logging in");
    try {
      const res = await loginUser(loginData as TLogin);
      if (res?.success) {
        toast.success(res?.message, { id: loadingId, duration: 3000 });
        if (redirect) {
          router.push(redirect);
          setIsLoading(true);
        } else {
          router.push("/profile");
          setIsLoading(true);
        }
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full lg:w-80 shadow-2xl space-y-5 bg-gray-200 dark:bg-gray-700 lg:space-y-6 px-4 py-2 rounded-xl">
      <div className="flex items gap-2 md:gap-4 font-inter">
        <button
          onClick={() => handleLoginAUto("admin")}
          type="button"
          className="w-full bg-secondary hover:bg-white dark:bg-primary dark:border dark:border-secondary dark:text-secondary dark:hover:bg-green-700 duration-500 text-primary border border-primary md:font-semibold py-1 px-1 rounded-lg shadow-md transition cursor-pointer"
        >
          Admin
        </button>
        <button
          onClick={() => handleLoginAUto("customer")}
          type="button"
          className="w-full bg-secondary hover:bg-white dark:bg-primary dark:border dark:border-secondary dark:text-secondary dark:hover:bg-green-700 duration-500 text-primary border border-primary md:font-semibold py-1 px-1 rounded-lg shadow-md transition cursor-pointer"
        >
          Customer
        </button>
        <button
          onClick={() => handleLoginAUto("mealProvider")}
          type="button"
          className="w-full bg-secondary hover:bg-white dark:bg-primary dark:border dark:border-secondary dark:text-secondary dark:hover:bg-green-700 duration-500 text-primary border border-primary md:font-semibold py-1 px-1 rounded-lg shadow-md transition cursor-pointer"
        >
          Provider
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 md:space-y-6 font-Inter"
      >
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
        <div>
          <Link
            className="text-primary dark:text-green-600"
            href="/forgot-password"
          >
            Forget Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-secondary hover:bg-white dark:bg-primary dark:border dark:border-secondary dark:text-secondary dark:hover:bg-green-700 duration-500 text-primary border border-primary font-semibold py-3 px-4 rounded-lg shadow-md transition cursor-pointer"
        >
          {isSubmitting ? "Logging in" : "Login"}
        </button>
      </form>

      <div className="flex gap-2 items-center mt-2 font-Inter">
        <h1>New to this site? Please</h1>
        <Link className="text-primary dark:text-green-600" href="/register">
          {" "}
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
