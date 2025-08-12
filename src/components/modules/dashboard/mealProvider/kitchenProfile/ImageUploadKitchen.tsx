"use client";

import { updateKitchen } from "@/services/kitchenService";
import { TKitchen } from "@/types/kitchenType";
import { imageUpload } from "@/utills/imageUploader";
import Image from "next/image";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "sonner";

const ImageUploadKitchen = ({ image }: { image: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("faild to upload image", { duration: 3000 });
      return;
    }
    const updatedData: Partial<TKitchen> = {};
    try {
      const imageUrl = await imageUpload(file);
      if (!imageUrl) {
        toast.error("faild to upload image", { duration: 3000 });
        return;
      }
      updatedData.kitchenPhoto = imageUrl;
      const result = await updateKitchen(updatedData);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="relative ">
      <Image
        src={image}
        alt="Profile"
        width={900}
        height={900}
        className=" border-4 border-white w-full h-[50vh] shadow-xl rounded-xl"
      />

      <label className="absolute bottom-0 right-0 z-10 cursor-pointer">
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
  );
};

export default ImageUploadKitchen;
