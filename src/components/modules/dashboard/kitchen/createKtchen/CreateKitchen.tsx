"use client";

import { TKitchen } from "@/types/kitchenType";
import {
  dhakaAreas,
  foodPreferance,
  kitchenType,
  mealTime,
  weekDays,
} from "../kitchen.const";
import { useForm } from "react-hook-form";
import InputType from "@/components/modules/formInput/InputType";
import InputSelect from "@/components/modules/formInput/InputSelect";
import ImagePreviewer from "@/components/modules/imageUploader/ImagePreviewer";
import { useState } from "react";
import ImageUploader from "@/components/modules/imageUploader/ImageUploader";
import InputCheckboxArray from "@/components/modules/formInput/InputCheckboxArray";
import { imageUpload } from "@/utills/imageUploader";
import { toast } from "sonner";
import { createKitchen } from "@/services/kitchenService";
import { useEdgeStore } from "@/lib/edgestore";
import PdfUploader from "@/components/modules/pdfUploader/PdfUploader";
import pdfUpload from "@/utills/pdfUpload";

const CreateKitchen = ({ verifiedEmail }: { verifiedEmail: boolean }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TKitchen>({
    defaultValues: {
      foodPreference: [],
      mealTimePerDay: [],
      cookingDays: [],
    },
    mode: "onChange",
  });
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [licensePdfFile, setLicensePdfFile] = useState<File | "">("");
  const [hygienePdf, setHygienePdf] = useState<File | "">("");
  const { edgestore } = useEdgeStore();

  const onSubmit = async (data: TKitchen) => {
    if (!verifiedEmail) {
      toast.error("You need to verify your email at first", { duration: 3000 });
      return;
    }
    if (data?.kitchenType === "Commercial" && !licensePdfFile) {
      toast.error("Commercial restaurant must have a license", {
        duration: 3000,
      });
      return;
    }
    if (data?.hygieneCertified && !hygienePdf) {
      toast.error("if Hygiene certified then provide the hygiene certificate", {
        duration: 3000,
      });
      return;
    }
    if (data?.specialEquipments) {
      const specialEquipments = data?.specialEquipments as string;
      const equipmentArray = specialEquipments
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
      data.specialEquipments = equipmentArray;
    }

    try {
      if (licensePdfFile) {
        const licenseOrCertificate = await pdfUpload(licensePdfFile, edgestore);
        if (!licenseOrCertificate) {
          toast.error("faild to upload lisence certificate", {
            duration: 3000,
          });
          return;
        }
        data.licenseOrCertificate = licenseOrCertificate as string;
      }
      if (hygienePdf) {
        const hygieneCertificate = await pdfUpload(hygienePdf, edgestore);
        if (!hygieneCertificate) {
          toast.error("faild to upload hygiene certificate", {
            duration: 3000,
          });
          return;
        }
        data.hygieneCertificate = hygieneCertificate as string;
      }
      const kitchenImage = imageFile ? await imageUpload(imageFile) : undefined;
      if (!kitchenImage) {
        toast.error("faild to upload image", { duration: 3000 });
        return;
      }
      data.kitchenPhoto = kitchenImage as string;
      const result = await createKitchen(data);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
        reset();
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-gray-200 dark:bg-gray-900 rounded-2xl shadow-xl text-gray-800 dark:text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          Create your kitchen
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-center">
            <InputType
              label="Kitchen Name"
              name="kitchenName"
              register={register}
              error={errors.kitchenName}
              required={true}
            />
            <InputSelect
              register={register}
              name="kitchenType"
              label="Kitchen Type"
              error={errors.kitchenType}
              options={kitchenType}
              required={true}
            />
            <InputSelect
              register={register}
              name="location"
              label="Location"
              error={errors.location}
              options={dhakaAreas}
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
            {watch("kitchenType") === "Commercial" && (
              <PdfUploader
                setPdfFile={setLicensePdfFile}
                label="License Certificate"
                id="license-upload"
              />
            )}
          </div>

          <div className="mb-4 grid md:grid-cols-3 grid-cols-1 gap-4 items-center">
            <label
              htmlFor="hygieneCertified"
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="space-y-3">
                <h1 className="text-sm font-medium text-gray-700">
                  Hygiene Certified (optional)
                </h1>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="hygieneCertified"
                    {...register("hygieneCertified")}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5" />
                </div>
              </div>
            </label>
            {watch("hygieneCertified") === true && (
              <PdfUploader
                setPdfFile={setHygienePdf}
                label="Hygiene Certificate"
                id="hygiene-upload"
              />
            )}
          </div>

          {/* Food Preference */}
          <InputCheckboxArray
            label="food preference"
            register={register}
            options={foodPreferance}
            name="foodPreference"
            errors={errors}
          />

          <InputCheckboxArray
            label="meal time"
            register={register}
            options={mealTime}
            name="mealTimePerDay"
            errors={errors}
            required={true}
          />

          {/* Cooking Days */}
          <InputCheckboxArray
            label="cooking days"
            register={register}
            options={weekDays}
            name="cookingDays"
            errors={errors}
            required={true}
          />

          <div className="mb-4">
            <label
              htmlFor="specialEquipments"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Special Equipments
            </label>
            <input
              id="specialEquipments"
              type="text"
              placeholder="e.g. Oven, Mixer, Blender"
              {...register("specialEquipments")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm placeholder-gray-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate items with commas ( , )
            </p>
            {errors.specialEquipments && (
              <p className="text-red-500 text-sm mt-1">
                {errors.specialEquipments.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition disabled:bg-gray-400 cursor-pointer"
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateKitchen;
