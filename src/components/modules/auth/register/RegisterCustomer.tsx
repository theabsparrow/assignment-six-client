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
import { FaArrowAltCircleLeft, FaHome } from "react-icons/fa";
import AcceptTermsInput from "../../formInput/AcceptTermsInput";
import { allergyOptions, genderOptions } from "./register.const";
import { calculateAge } from "@/utills/calculateAge";
import { toast } from "sonner";
import {
  TAlergies,
  TCustomerRegistrationData,
  TGender,
} from "@/types/customerRegistration";
import { useRouter } from "next/navigation";
import { imageUpload } from "@/utills/imageUploader";
import {
  reCaptchaTokenVerification,
  registerCustomer,
} from "@/services/authService";
import ReCAPTCHA from "react-google-recaptcha";
import { config } from "@/config";
import { useUser } from "@/context/UserContext";
import OtpVerification from "../OtpComponent/OtpVerification";

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
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [recaptchaStatus, setRecaptchaStatus] = useState(false);
  const [otpPage, setOtpPage] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
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
      const res = await reCaptchaTokenVerification(value as string);
      if (res?.success) {
        setRecaptchaStatus(true);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const age = calculateAge(data?.dateOfBirth);
    if (age < 18) {
      toast.error("your age is under 18. you are not permitted to register", {
        duration: 3000,
      });
      return;
    }
    const user = {
      email: data?.email,
      phone: data?.phone,
      password: data?.password,
    };
    type TCustomer = {
      name: string;
      profileImage?: string;
      address: string;
      allergies?: TAlergies[];
      gender: TGender;
      dateOfBirth: string;
    };
    const customer: TCustomer = {
      name: data?.name,
      address: data?.address,
      dateOfBirth: data?.dateOfBirth,
      gender: data?.gender as TGender,
      allergies: data?.allergies as TAlergies[],
    };
    setOtpPage(true);
    localStorage.setItem("verifyOtpForm", "otpForm");
    try {
      const profileImage = imageFile ? await imageUpload(imageFile) : undefined;
      if (profileImage) {
        customer.profileImage = profileImage;
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
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleClearState = () => {
    router.push("/login");
    localStorage.removeItem("customerForm");
    localStorage.removeItem("mealProviderForm");
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-gray-200 dark:bg-gray-900 rounded-2xl shadow-xl text-gray-800 dark:text-white">
      {otpPage ? (
        <OtpVerification setOtpPage={setOtpPage} />
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                localStorage.removeItem("customerForm");
                localStorage.removeItem("mealProviderForm");
                localStorage.removeItem("otpExpiry");
                localStorage.removeItem("verifyOtpForm");
                setRegisteredRole("");
              }}
              className="cursor-pointer"
            >
              <FaArrowAltCircleLeft className="text-blue-600 text-xl" />
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("customerForm");
                localStorage.removeItem("mealProviderForm");
                localStorage.removeItem("otpExpiry");
                localStorage.removeItem("verifyOtpForm");
                setRegisteredRole("");
              }}
              className="cursor-pointer flex items-center gap-1 text-blue-600 text-lg font-semibold hover:underline duration-500"
            >
              <FaHome /> Back to home
            </button>
          </div>
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
              name="gender"
              label="Select Gender"
              error={errors.gender}
              options={genderOptions}
              required={true}
            />
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
              disabled={recaptchaStatus ? false : true}
              type="submit"
              className="w-full bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition disabled:bg-gray-400"
            >
              {isSubmitting ? "Registering" : "Register"}
            </button>
          </form>
          <div className="flex gap-2 items-center mt-2">
            <h1>Already have an Account? Please</h1>
            <button
              onClick={handleClearState}
              className="text-blue-700 cursor-pointer"
            >
              {" "}
              Login
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RegisterCustomer;
