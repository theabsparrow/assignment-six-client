import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import InputType from "../../formInput/InputType";
import InputPhone from "../../formInput/InputPhone";
import InputTypePassword from "../../formInput/InputTypePassword";
import InputDate from "../../formInput/InputDate";
import ImagePreviewer from "../../imageUploader/ImagePreviewer";
import ImageUploader from "../../imageUploader/ImageUploader";
import InputSelect from "../../formInput/InputSelect";
import { genderOptions, isCertified } from "./register.const";
import AcceptTermsInput from "../../formInput/AcceptTermsInput";
import Link from "next/link";
import InputTextArea from "../../formInput/InputTextArea";
import { calculateAge } from "@/utills/calculateAge";
import { toast } from "sonner";
import { TGender } from "@/types/customerRegistration";
import { TMealproviderRegistrationData } from "@/types/mealProviderRegistration";
import { useRouter } from "next/navigation";
import { imageUpload } from "@/utills/imageUploader";
import {
  // reCaptchaTokenVerification,
  registerMealprovider,
} from "@/services/authService";
// import { config } from "@/config";
// import ReCAPTCHA from "react-google-recaptcha";
import { useUser } from "@/context/UserContext";

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
  isCertified: boolean;
  licenseDocument?: string;
};

const RegisterMealProvider = ({
  setRegisteredRole,
}: {
  setRegisteredRole: Dispatch<SetStateAction<string | null>>;
}) => {
  const router = useRouter();
  useEffect(() => {
    const savedRole = localStorage.getItem("mealProviderForm");
    if (!savedRole) {
      setRegisteredRole("mealProvider");
      localStorage.setItem("mealProviderForm", "mealProvider");
    } else {
      setRegisteredRole(savedRole);
    }
  }, [setRegisteredRole]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
  });
  const { setIsLoading } = useUser();
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  // const [recaptchaStatus, setRecaptchaStatus] = useState(false);

  // const handleRecaptcha = async (value: string | null) => {
  //   try {
  //     const res = await reCaptchaTokenVerification(value as string);
  //     if (res?.success) {
  //       setRecaptchaStatus(true);
  //     }
  //   } catch (error: any) {
  //     console.error(error);
  //   }
  // };

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
      isCertified: boolean;
      licenseDocument?: string;
    };
    const isCertified: boolean =
      (data?.isCertified as unknown as string) === "true" ? true : false;
    const mealProvider: TMealProvider = {
      name: data?.name,
      address: data?.address,
      dateOfBirth: data?.dateOfBirth,
      gender: data?.gender as TGender,
      bio: data?.bio,
      experienceYears: Number(data?.experienceYears),
      isCertified: isCertified,
    };
    if (data?.licenseDocument) {
      mealProvider.licenseDocument = data?.licenseDocument;
    }
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
        Meal Provider Registration
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
            <div className="mt-8">
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
          <InputSelect
            register={register}
            name="isCertified"
            label="is Certified ?"
            error={errors.isCertified}
            options={isCertified}
            required={true}
          />
          <InputType
            label="license Number"
            name="licenseDocument"
            register={register}
            error={errors.licenseDocument}
            type="text"
            validateMatch={watch("isCertified")}
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

        <div>
          <Link className="text-blue-700" href="/forget-pass">
            Forget Password?
          </Link>
        </div>

        {/* <ReCAPTCHA
          sitekey={config.next_public_recaptcha_client_key as string}
          onChange={handleRecaptcha}
        /> */}
        <button
          // disabled={recaptchaStatus ? false : true}
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
  );
};

export default RegisterMealProvider;
