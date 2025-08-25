"use client";

import { updateBlog } from "@/services/blogService";
import { imageUpload } from "@/utills/imageUploader";
import Image from "next/image";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "sonner";

const BlogImageupload = ({ image, id }: { image: string; id: string }) => {
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
      const blogData = {
        coverImage: imageUrl,
      };
      const result = await updateBlog(id, blogData);
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
    <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden rounded-lg bg-white/65">
      <Image
        src={image}
        alt="Cover Image"
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
      />
      <label className="absolute bottom-0 right-1 z-10 cursor-pointer">
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

export default BlogImageupload;
