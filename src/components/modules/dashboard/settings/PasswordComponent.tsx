"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginFormInput from "../../formInput/LoginFormInput";
import InputTypePassword from "../../formInput/InputTypePassword";
import { TPassword } from "@/types/passwordTypes";
import { changePassword } from "@/services/authService";
import { toast } from "sonner";

const PasswordComponent = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TPassword>({
    mode: "onChange",
  });

  const onSubmit = async (data: TPassword) => {
    const passwordInfo = {
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    };
    try {
      const res = await changePassword(passwordInfo);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        reset();
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="border border-gray-400 px-10 py-5">
      <h3 className="text-2xl font-bold text-gray-700 text-center">
        Password settings
      </h3>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="text-purple-800 font-semibold "
        >
          {" "}
          change password
        </button>
      )}
      {open && (
        <div className="md:w-xs">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <LoginFormInput
              label="Old Password"
              name="oldPassword"
              placeholder="enter your old password"
              register={register}
              error={errors.oldPassword}
              type="password"
              required={true}
            />
            <InputTypePassword
              register={register}
              error={errors.newPassword}
              name="newPassword"
              label="New Password"
              required={true}
            />

            <InputTypePassword
              register={register}
              error={errors.confirmPass}
              name="confirmPass"
              label="Confirm New Password"
              required={true}
              validateMatch={watch("newPassword")}
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                {isSubmitting ? "Changing" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordComponent;
