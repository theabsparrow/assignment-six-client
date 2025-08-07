import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputType from "../../formInput/InputType";
import InputPhone from "../../formInput/InputPhone";
import InputTypePassword from "../../formInput/InputTypePassword";
import InputDate from "../../formInput/InputDate";
import ImagePreviewer from "../../imageUploader/ImagePreviewer";
import ImageUploader from "../../imageUploader/ImageUploader";
import InputSelect from "../../formInput/InputSelect";
import { genderOptions } from "./register.const";
import AcceptTermsInput from "../../formInput/AcceptTermsInput";
import InputTextArea from "../../formInput/InputTextArea";
import { calculateAge } from "@/utills/calculateAge";
import { toast } from "sonner";
import { TGender } from "@/types/customerRegistration";
import { TMealproviderRegistrationData } from "@/types/mealProviderRegistration";
import { imageUpload } from "@/utills/imageUploader";
import {
  reCaptchaTokenVerification,
  registerMealprovider,
} from "@/services/authService";
import { config } from "@/config";
import ReCAPTCHA from "react-google-recaptcha";
import { useUser } from "@/context/UserContext";
import OtpVerification from "../OtpComponent/OtpVerification";
import Link from "next/link";

type FormValues = {
  email: string;
  phone: string;
  password: string;
  name: string;
  profileImage?: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  confirmPass: string;
  bio: string;
  experienceYears?: number;
};

const RegisterMealProvider = ({
  setRegisteredRole,
}: {
  setRegisteredRole: Dispatch<SetStateAction<string | null>>;
}) => {
  const { setIsLoading } = useUser();
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  // const [recaptchaStatus, setRecaptchaStatus] = useState(false);
  const [otpPage, setOtpPage] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  useEffect(() => {
    const savedRole = localStorage.getItem("mealProviderForm");
    if (!savedRole) {
      setRegisteredRole("mealProvider");
      localStorage.setItem("mealProviderForm", "mealProvider");
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
    type TMealProvider = {
      name: string;
      profileImage?: string;
      address: string;
      gender: TGender;
      dateOfBirth: string;
      bio: string;
      experienceYears?: number;
    };
    const mealProvider: TMealProvider = {
      name: data?.name,
      address: data?.address,
      dateOfBirth: data?.dateOfBirth,
      gender: data?.gender as TGender,
      bio: data?.bio,
      experienceYears: Number(data?.experienceYears),
    };
    try {
      const profileImage = imageFile ? await imageUpload(imageFile) : undefined;
      if (profileImage) {
        mealProvider.profileImage = profileImage;
      }
      const mealProviderRegisterInfo: TMealproviderRegistrationData = {
        user,
        mealProvider,
      };
      const res = await registerMealprovider(mealProviderRegisterInfo);
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

  return (
    <section className="w-[85vw] md:w-[30vw] rounded-2xl text-gray-800 dark:text-white font-inter bg-gray-200 dark:bg-transparent py-2 px-4">
      {otpPage ? (
        <OtpVerification setOtpPage={setOtpPage} />
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2 items-center ">
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
                error={errors.address}
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
              <InputType
                label="Years of Experience"
                name="experienceYears"
                register={register}
                error={errors.experienceYears}
                type="number"
              />
            </div>

            <InputTextArea
              label="Bio"
              name="bio"
              placeholder="write about your bio"
              register={register}
              error={errors.bio}
              required={true}
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
              type="submit"
              className="w-full bg-secondary hover:bg-white dark:bg-primary dark:border dark:border-secondary dark:text-secondary dark:hover:bg-green-700 duration-500 text-primary border border-primary font-semibold py-3 px-4 rounded-lg shadow-md transition cursor-pointer"
            >
              {isSubmitting ? "Registering" : "Register"}
            </button>
          </form>
          <div className="flex gap-2 items-center dark:justify-end mt-2">
            <h1>Already have an Account? Please</h1>
            <Link
              href="/login"
              onClick={() => {
                localStorage.removeItem("customerForm");
                localStorage.removeItem("mealProviderForm");
              }}
              className="text-primary dark:text-green-600 text-lg cursor-pointer"
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

export default RegisterMealProvider;
