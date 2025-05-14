"use client";

import { useState } from "react";
import { FaExclamationTriangle, FaTimes, FaTrashAlt } from "react-icons/fa";
import LoginFormInput from "../../formInput/LoginFormInput";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { deleteMyAccount } from "@/services/profileService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type TPassword = {
  password: string;
};

const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPassword>({
    mode: "onChange",
  });

  const onSubmit = async (data: TPassword) => {
    try {
      const res = await deleteMyAccount(data);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        router.push("/");
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="border border-red-400 px-6 md:px-10 py-6 rounded-md bg-white dark:bg-gray-950 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl md:text-2xl font-bold text-red-700 flex items-center gap-2">
          <FaTrashAlt className="text-red-600" />
          Account Deletion
        </h3>
        <button
          onClick={() => setOpen(true)}
          className="text-sm md:text-base text-red-600 hover:text-red-800 underline cursor-pointer"
        >
          Delete Account
        </button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg shadow-xl p-6 relative animate-fadeIn">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 "
                aria-label="Close"
              >
                <FaTimes size={18} />
              </button>

              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-4">
                <FaExclamationTriangle size={20} />
                <h2 className="text-xl font-semibold">
                  Confirm Account Deletion
                </h2>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                This action is <strong>permanent</strong> and cannot be undone.
                Please enter your password to confirm deletion of your account.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <LoginFormInput
                  label="Password"
                  name="password"
                  placeholder="enter your password"
                  register={register}
                  error={errors.password}
                  type="password"
                  required={true}
                />
                <div className="mt-4">
                  <Link className="text-blue-700 " href="/forgot-password">
                    Forget Password?
                  </Link>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
                  >
                    <FaTrashAlt />
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default DeleteAccount;
