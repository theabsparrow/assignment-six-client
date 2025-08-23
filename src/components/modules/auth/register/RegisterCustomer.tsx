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
import AcceptTermsInput from "../../formInput/AcceptTermsInput";
import { allergyOptions, genderOptions } from "./register.const";
import { calculateAge } from "@/utills/calculateAge";
import { toast } from "sonner";
import {
  FormValuesCustomer,
  TAlergies,
  TCustomerRegistrationData,
  TGender,
} from "@/types/customerRegistration";
import { imageUpload } from "@/utills/imageUploader";
import {
  reCaptchaTokenVerification,
  registerCustomer,
} from "@/services/authService";
import ReCAPTCHA from "react-google-recaptcha";
import { config } from "@/config";
import { useUser } from "@/context/UserContext";
import OtpVerification from "../OtpComponent/OtpVerification";
import Link from "next/link";
import { TUserPayload } from "@/types";

const RegisterCustomer = ({
  setRegisteredRole,
}: {
  setRegisteredRole: Dispatch<SetStateAction<string | null>>;
}) => {
  const { setIsLoading } = useUser();
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  // const [recaptchaStatus, setRecaptchaStatus] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValuesCustomer>({
    defaultValues: {
      allergies: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    const savedRole = localStorage.getItem("customerForm");
    if (!savedRole) {
      setRegisteredRole("customer");
      localStorage.setItem("customerForm", "customer");
    } else {
      setRegisteredRole(savedRole);
    }
  }, [setRegisteredRole]);

  useEffect(() => {
    const otpForm = localStorage.getItem("verifyOtpForm");
    if (otpForm) {
      setOtpPage(true);
    } else {
      setOtpPage(false);
    }
  }, []);

  const handleRecaptcha = async (value: string | null) => {
    try {
      await reCaptchaTokenVerification(value as string);
      // if (res?.success) {
      //   setRecaptchaStatus(true);
      // }
    } catch (error: any) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormValuesCustomer) => {
    setLoading(true);
    const age = calculateAge(data?.dateOfBirth);
    if (age < 18) {
      toast.error("your age is under 18. you are not permitted to register", {
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    const user = {
      email: data?.email,
      phone: data?.phone,
      password: data?.password,
    };

    const customer: TUserPayload = {
      name: data?.name,
      address: data?.address,
      dateOfBirth: data?.dateOfBirth,
      gender: data?.gender as TGender,
      allergies: data?.allergies as TAlergies[],
    };
    setOtpPage(true);
    localStorage.setItem("verifyOtpForm", "otpForm");
    try {
      if (imageFile) {
        const profileImage = await imageUpload(imageFile);
        if (!profileImage) {
          toast.error("image upload faild", {
            duration: 3000,
          });
          setLoading(false);
          return;
        } else {
          customer.profileImage = profileImage;
        }
      }
      const customerRegisterInfo: TCustomerRegistrationData = {
        user,
        customer,
      };
      const res = await registerCustomer(customerRegisterInfo);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setOtpPage(true);
        localStorage.setItem("verifyOtpForm", "otpForm");
        reset();
        setLoading(false);
      } else {
        toast.error(res?.message, { duration: 3000 });
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <section className="w-[85vw] md:w-[30vw] rounded-2xl text-gray-800 dark:text-white font-inter bg-gray-200 dark:bg-transparent py-2 px-4">
      {otpPage ? (
        <OtpVerification setOtpPage={setOtpPage} />
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2 md:gap-4 items-center ">
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
                error={errors.email}
                type="email"
                required={true}
              />

              <InputPhone
                label="Phone"
                name="phone"
                register={register}
                error={errors.phone}
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
                <div className="mt-2">
                  <ImageUploader
                    setImageFile={setImageFile}
                    setImagePreview={setImagePreview}
                  />
                </div>
              )}

              <InputSelect
                register={register}
                name="gender"
                label="Select Gender"
                error={errors.gender}
                options={genderOptions}
                required={true}
              />
            </div>

            <InputCheckboxArray
              label="allergies"
              register={register}
              options={allergyOptions}
              name="allergies"
              errors={errors}
            />

            <AcceptTermsInput
              register={register}
              name="termsAccepted"
              errors={errors}
              required={true}
            />

            <ReCAPTCHA
              sitekey={config.next_public_recaptcha_client_key as string}
              onChange={handleRecaptcha}
            />
            <button
              // disabled={recaptchaStatus ? false : true}
              disabled={loading}
              type="submit"
              className="w-full bg-secondary hover:bg-white dark:bg-primary dark:border dark:border-secondary dark:text-secondary dark:hover:bg-green-700 duration-500 text-primary border border-primary font-semibold py-3 px-4 rounded-lg shadow-md transition cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
            >
              {isSubmitting ? "Registering" : "Register"}
            </button>
          </form>
          <div className="flex gap-2 items-center mt-2">
            <h1>Already have an Account? Please</h1>
            <Link
              href="/login"
              onClick={() => {
                localStorage.removeItem("customerForm");
                localStorage.removeItem("mealProviderForm");
              }}
              className="text-primary dark:text-green-500 hover:underline cursor-pointer text-lg"
            >
              {" "}
              Login
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default RegisterCustomer;
