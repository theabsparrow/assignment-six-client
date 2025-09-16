import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Not found - Daily Dish",
  description:
    "This is not found page. after any irrelevent route hitting you will be redirected to this page",
};

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
      <Image
        src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
        alt="Empty Plate"
        width={200}
        height={200}
        className="mb-6"
      />

      <h1 className="text-5xl font-bold text-primary mb-4">
        404 - Dish Not Found
      </h1>
      <p className="text-gray-600 max-w-md mb-8">
        Oops! Looks like the meal you`re craving is off the menu. But don’t
        worry — we’ve got plenty of other delicious options waiting for you.
      </p>

      <Link
        href="/"
        className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition"
      >
        Explore Today’s Menu
      </Link>
    </div>
  );
};

export default NotFound;
