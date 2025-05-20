"use client";

import { USER_ROLE } from "@/constant";
import {
  updateCustomerProfile,
  updateMealProviderProfile,
} from "@/services/profileService";
import { imageUpload } from "@/utills/imageUploader";
import Image from "next/image";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "sonner";

const ImageSection = ({ image, role }: { image: string; role: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("faild to upload image", { duration: 3000 });
      return;
    }
    try {
      const imageUrl = await imageUpload(file);
      if (!imageUrl) {
        toast.error("faild to upload image", { duration: 3000 });
        return;
      }
      if (role === USER_ROLE.mealProvider) {
        const updatedData = { profileImage: imageUrl };
        const result = await updateMealProviderProfile(updatedData);
        if (result?.success) {
          toast.success(result?.message, { duration: 3000 });
        } else {
          toast.error(result?.message, { duration: 3000 });
        }
        return;
      }
      if (role === USER_ROLE.admin || role === USER_ROLE.customer) {
        const updatedData = { profileImage: imageUrl };
        const result = await updateCustomerProfile(updatedData);
        if (result?.success) {
          toast.success(result?.message, { duration: 3000 });
        } else {
          toast.error(result?.message, { duration: 3000 });
        }
        return;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <label className="relative group cursor-pointer">
        {image ? (
          <Image
            src={image}
            alt="Profile"
            width={400}
            height={400}
            className="rounded-full object-cover border-4 border-white shadow-md h-72 w-72"
          />
        ) : (
          <div className="rounded-full border-4 border-white shadow-md h-72 w-72 bg-green-500"></div>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100  transition duration-500">
          <FaCamera className="text-white text-2xl" />
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
  );
};

export default ImageSection;
