"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputType from "../../formInput/InputType";
import InputPhone from "../../formInput/InputPhone";
import PasswordComponent from "./PasswordComponent";
type TSettingsInfo = {
  email?: string;
  phone?: string;
};

const SettingsComponent = ({ user }: { user: TSettingsInfo }) => {
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

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

  const onSubmit = (data: TSettingsInfo) => {
    const dirtyOnly: Partial<TSettingsInfo> = {};
    if (dirtyFields.email) {
      dirtyOnly.email = data.email;
    }
    if (dirtyFields.phone) {
      dirtyOnly.phone = data.phone;
    }
    console.log(dirtyOnly);
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
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEmail(user?.email as string);
                      setIsEditingEmail(false);
                      reset({ email });
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
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
                  onClick={() => setIsEditingEmail(true)}
                  className="text-sm font-semibold text-purple-600 hover:text-purple-700 hover:underline transition"
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
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      reset({ phone });
                      setPhone(user?.phone as string);
                      setIsEditingPhone(false);
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-gray-600">{phone}</p>
                <button
                  onClick={() => setIsEditingPhone(true)}
                  className="text-purple-600 hover:underline font-medium"
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
