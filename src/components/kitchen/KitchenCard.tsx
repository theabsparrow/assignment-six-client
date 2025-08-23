"use client";

import { TAllKitchenType } from "@/types/kitchenType";
import { CheckCircle, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const KitchenCard = ({ kitchenData }: { kitchenData: TAllKitchenType }) => {
  return (
    <section className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg p-4">
      <div>
        <Image
          src={kitchenData?.kitchenPhoto}
          alt={kitchenData?.kitchenName}
          height={700}
          width={700}
          className="object-cover h-[30vh] w-full] rounded-xl"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary flex items-center gap-4">
            {kitchenData?.kitchenName}
            <span className="text-lg font-medium">
              ({kitchenData?.kitchenType})
            </span>
          </h1>
        </div>

        <h1 className="flex items-center text-base text-gray-700">
          <MapPin className="w-5 h-5 mr-2 mt-0.5 text-green-700" />
          <span>{kitchenData?.location || "No location provided"}</span>
        </h1>
        <div
          className={`flex items-center font-medium ${
            kitchenData?.hygieneCertified
              ? "text-green-600"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {kitchenData?.hygieneCertified && (
            <CheckCircle className="w-5 h-5 mr-2" />
          )}
          <h1>
            Hygiene{" "}
            {kitchenData?.hygieneCertified
              ? "Certified"
              : "Certification Pending"}
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg border border-primary py-1 px-2 rounded-xl">
            {kitchenData?.subscriber}{" "}
            {kitchenData?.subscriber > 1 ? "Subscribers" : "Subscriber"}
          </h1>
          <Link
            href={`/kitchen/${kitchenData?._id}`}
            className="bg-secondary py-1 px-2 rounded-lg text-primary hover:bg-primary hover:text-white border border-primary duration-500"
          >
            View Kitchen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KitchenCard;
