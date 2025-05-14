"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputPhone from "../../formInput/InputPhone";
import PasswordComponent from "./PasswordComponent";
import { TSettingsInfo } from "@/types";
import { toast } from "sonner";
import { updatePhoneEmail } from "@/services/profileService";
import VerifyEmail from "../../auth/OTPModal/VerifyEmail";
import LoginFormInput from "../../formInput/LoginFormInput";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import DeleteAccount from "./DeleteAccount";

const SettingsComponent = ({ user }: { user: TSettingsInfo }) => {
  const [open, setOpen] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { dirtyFields, errors },
  } = useForm<TSettingsInfo>({
    mode: "onChange",
    defaultValues: {
      email: user?.email,
      phone: user?.phone,
    },
  });

  const onSubmit = async (data: TSettingsInfo) => {
    const dirtyOnly: Partial<TSettingsInfo> = {};
    if (dirtyFields?.email) {
      dirtyOnly.email = data?.email;
    }
    if (dirtyFields?.phone) {
      dirtyOnly.phone = data?.phone;
    }
    if (dirtyFields?.password) {
      dirtyOnly.password = data?.password;
    }
    if (dirtyOnly?.email && !dirtyFields?.password) {
      toast.error("password is needed to update the email", { duration: 3000 });
    }

    if (Object.entries(dirtyOnly).length === 0) {
      toast.error("nothing to update", { duration: 3000 });
      return;
    }
    try {
      const res = await updatePhoneEmail(dirtyOnly);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setIsEditingEmail(false);
        setIsEditingPhone(false);
        setIsEditing(true);
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="md:w-[70vw] mx-auto p-6 mt-10 bg-white shadow rounded-xl space-y-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Account Settings
      </h2>

      <div className="border border-gray-400 px-10 py-5">
        <h3 className="text-2xl font-bold text-gray-700 text-center">
          Contact information
        </h3>
        <div className="flex items-start gap-4 mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" md:w-xs mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                Email
                <span
                  className={`text-sm font-medium px-2 py-0.5 rounded-full border ${
                    user?.verifiedWithEmail
                      ? "text-green-700 bg-green-100 border-green-300 dark:text-green-300 dark:bg-green-900 dark:border-green-600"
                      : "text-yellow-800 bg-yellow-100 border-yellow-300 dark:text-yellow-300 dark:bg-yellow-900 dark:border-yellow-600"
                  }`}
                >
                  {user?.verifiedWithEmail ? "Verified" : "Not Verified"}
                </span>
              </h3>
              {isEditingEmail ? (
                <div className="flex flex-col gap-3">
                  <LoginFormInput
                    label="Email"
                    name="email"
                    placeholder="enter your valid email"
                    register={register}
                    error={errors.email}
                    type="email"
                    required={true}
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={async () => {
                        const valid = await trigger("email");
                        console.log(valid);
                        if (valid) {
                          setOpen(true);
                        }
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingEmail(!isEditingEmail);
                        setIsEditing(true);
                        reset({ email: user?.email });
                      }}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-base text-gray-700">
                      <span className="text-gray-600">{user?.email}</span>
                    </p>
                    <button
                      onClick={() => {
                        setIsEditingEmail(!isEditingEmail);
                        setIsEditing(false);
                      }}
                      className=" font-semibold text-purple-600 hover:text-purple-700 hover:underline transition cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>

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
                      onClick={() => setOpen(false)}
                      className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
                    >
                      <FaTimes />
                    </button>
                    <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      You need to provide your password to change the email
                    </h2>
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
                      <Link className="text-blue-700" href="/forgot-password">
                        Forget Password?
                      </Link>
                    </div>
                    <button
                      type="submit"
                      onClick={() => {
                        setOpen(true);
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer mt-4"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="space md:w-xs">
              <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
              {isEditingPhone ? (
                <div className="flex flex-col gap-3">
                  <InputPhone
                    label="Phone"
                    name="phone"
                    register={register}
                    error={errors?.phone}
                    required={true}
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        reset({ phone: user?.phone });
                        // setPhone(user?.phone as string);
                        setIsEditingPhone(!isEditingPhone);
                        setIsEditing(true);
                      }}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">{user?.phone}</p>
                  <button
                    onClick={() => {
                      setIsEditingPhone(!isEditingPhone);
                      setIsEditing(false);
                    }}
                    className="text-purple-600 hover:underline font-medium cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </form>
          {!user?.verifiedWithEmail && <VerifyEmail isEditing={isEditing} />}
        </div>
      </div>

      <PasswordComponent />
      <DeleteAccount />
    </section>
  );
};

export default SettingsComponent;
