"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputType from "../../formInput/InputType";
import InputPhone from "../../formInput/InputPhone";
import InputTypePassword from "../../formInput/InputTypePassword";
import InputDate from "../../formInput/InputDate";
import ImagePreviewer from "../../imageUploader/ImagePreviewer";
import ImageUploader from "../../imageUploader/ImageUploader";
import InputSelect from "../../formInput/InputSelect";
import InputCheckboxArray from "../../formInput/InputCheckboxArray";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import AcceptTermsInput from "../../formInput/AcceptTermsInput";
import Link from "next/link";
import { allergyOptions, genderOptions } from "./register.const";

type FormValues = {
  email: string;
  phone: string;
  password: string;
  name: string;
  profileImage?: string;
  address: string;
  allergies?: string[];
  gender: string;
  dateOfBirth: string;
  confirmPass: string;
};

const RegisterCustomer = ({
  setRegisteredRole,
}: {
  setRegisteredRole: Dispatch<SetStateAction<string | null>>;
}) => {
  useEffect(() => {
    const savedRole = localStorage.getItem("customerForm");
    if (!savedRole) {
      setRegisteredRole("customer");
      localStorage.setItem("customerForm", "customer");
    } else {
      setRegisteredRole(savedRole);
    }
  }, [setRegisteredRole]);
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      allergies: [],
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-200 dark:bg-gray-900 rounded-2xl shadow-xl text-gray-800 dark:text-white">
      <button
        onClick={() => {
          localStorage.removeItem("customerForm");
          localStorage.removeItem("mealProviderForm");
          setRegisteredRole("");
        }}
        className="cursor-pointer"
      >
        <FaArrowAltCircleLeft className="text-blue-600 text-xl" />
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Customer Registration
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-center">
          <InputType
            label="Name"
            name="name"
            register={register}
            error={errors.name}
            required={true}
          />

          <InputType
            label="Email"
            name="email"
            register={register}
            error={errors.name}
            type="email"
            required={true}
          />

          <InputPhone
            label="Phone"
            name="phone"
            register={register}
            error={errors.name}
            required={true}
          />
          <InputType
            label="Address"
            name="address"
            register={register}
            error={errors.name}
            required={true}
          />

          <InputTypePassword
            register={register}
            error={errors.password}
            name="password"
            label="Password"
            required={true}
          />

          <InputTypePassword
            register={register}
            error={errors.confirmPass}
            name="confirmPass"
            label="Confirm Password"
            required={true}
            validateMatch={watch("password")}
          />

          <InputDate
            register={register}
            error={errors.dateOfBirth}
            required={true}
          />

          {imagePreview ? (
            <ImagePreviewer
              setImageFile={setImageFile}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          ) : (
            <div className="mt-8">
              <ImageUploader
                setImageFile={setImageFile}
                setImagePreview={setImagePreview}
              />
            </div>
          )}
        </div>
        <InputSelect
          register={register}
          error={errors.gender}
          genderOptions={genderOptions}
          required={true}
        />
        <InputCheckboxArray
          register={register}
          options={allergyOptions}
          name="allergies"
          errors={errors}
          required={false}
        />

        <AcceptTermsInput
          register={register}
          name="termsAccepted"
          errors={errors}
          required={true}
        />

        <div>
          <Link className="text-blue-700" href="/forget-pass">
            Forget Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition"
        >
          Regester
        </button>
      </form>
      <div className="flex gap-2 items-center mt-2">
        <h1>Already have an Account? Please</h1>
        <Link className="text-blue-700" href="/login">
          {" "}
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterCustomer;
