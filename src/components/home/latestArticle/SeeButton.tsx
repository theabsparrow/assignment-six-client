"use client";

import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

const SeeButton = () => {
  return (
    <div className="flex justify-center items-center">
      <Link
        href="/blogs"
        className="bg-secondary text-primary border border-primary px-4 py-2 rounded-xl font-medium hover:bg-primary hover:border-secondary hover:text-secondary transition-all duration-500 flex items-center gap-1"
      >
        See All
        <IoArrowForward />
      </Link>
    </div>
  );
};

export default SeeButton;
