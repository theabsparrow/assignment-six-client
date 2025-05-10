"use client";

import { useForm } from "react-hook-form";
import InputTypePassword from "../../formInput/InputTypePassword";
import { setNewPassword } from "@/services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type TPassword = {
  newPassword: string;
  confirmPass: string;
};

const SetNewPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TPassword>({
    mode: "onChange",
  });

  const onSubmit = async (data: TPassword) => {
    const passwordInfo = {
      newPassword: data?.newPassword,
    };
    try {
      const res = await setNewPassword(passwordInfo);
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
        🔐 Set New Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
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
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full cursor-pointer"
        >
          {isSubmitting ? "Saving" : "Save"}
        </button>
        <button />
      </form>
    </div>
  );
};

export default SetNewPassword;
