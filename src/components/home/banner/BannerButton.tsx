"use client";

import Link from "next/link";
const BannerButton = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Discover Deliciousness Delivered Fresh
        </h1>
        <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Explore homemade meals tailored to your taste, made with love and
          curated by passionate chefs from your community.
        </p>
        <Link
          href="/meals"
          className="mt-4 bg-white text-purple-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-purple-100 transition duration-300 cursor-pointer"
        >
          Browse Meals
        </Link>
      </div>
    </>
  );
};

export default BannerButton;
