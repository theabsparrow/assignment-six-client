"use client";

import { updateMeal } from "@/services/mealService";
import { TUpdatemealData } from "@/types/mealType";
import { imageUpload } from "@/utills/imageUploader";
import Image from "next/image";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "sonner";

const ImageUploadmeal = ({ image, id }: { image: string; id: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("faild to upload image", { duration: 3000 });
      return;
    }
    const data: Partial<TUpdatemealData> = {};
    const toastId = toast.loading("uploading image...");
    try {
      const imageUrl = await imageUpload(file);
      if (!imageUrl) {
        toast.error("faild to upload image", { id: toastId, duration: 3000 });
        return;
      }
      data.imageUrl = imageUrl;
      const result = await updateMeal(data, id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <section className="w-full flex justify-center">
      <div className="relative w-72 h-72 ">
        <Image
          src={image}
          alt="Profile"
          width={900}
          height={900}
          className=" rounded-full object-cover border-4 border-white shadow-md w-72 h-72"
        />

        <label className="absolute bottom-0 right-14 z-10 cursor-pointer">
          <div className="bg-white p-2 rounded-full">
            <FaCamera className="text-black group-hover:text-white text-2xl transition duration-300" />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </section>
  );
};

export default ImageUploadmeal;
