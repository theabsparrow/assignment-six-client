"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputType from "../../formInput/InputType";
import InputPhone from "../../formInput/InputPhone";
import PasswordComponent from "./PasswordComponent";
import { TSettingsInfo } from "@/types";
import { toast } from "sonner";
import { updatePhoneEmail } from "@/services/profileService";
import { useRouter } from "next/navigation";

const SettingsComponent = ({ user }: { user: TSettingsInfo }) => {
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields, errors },
  } = useForm<TSettingsInfo>({
    defaultValues: {
      email,
      phone,
    },
  });

  const onSubmit = async (data: TSettingsInfo) => {
    const dirtyOnly: Partial<TSettingsInfo> = {};
    if (dirtyFields.email) {
      dirtyOnly.email = data.email;
    }
    if (dirtyFields.phone) {
      dirtyOnly.phone = data.phone;
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
        router.refresh();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" md:w-xs mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Email</h3>
            {isEditingEmail ? (
              <div className="flex flex-col gap-3">
                <InputType
                  label="Email"
                  name="email"
                  register={register}
                  error={errors?.email}
                  type="email"
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
                      setEmail(user?.email as string);
                      setIsEditingEmail(!isEditingEmail);
                      reset({ email });
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-base text-gray-700">
                  <span className="text-gray-600">{email}</span>
                </p>
                <button
                  onClick={() => setIsEditingEmail(!isEditingEmail)}
                  className="text-sm font-semibold text-purple-600 hover:text-purple-700 hover:underline transition cursor-pointer"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

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
                      reset({ phone });
                      setPhone(user?.phone as string);
                      setIsEditingPhone(!isEditingPhone);
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-gray-600">{phone}</p>
                <button
                  onClick={() => setIsEditingPhone(!isEditingPhone)}
                  className="text-purple-600 hover:underline font-medium cursor-pointer"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <PasswordComponent />
    </section>
  );
};

export default SettingsComponent;
