"use client";

import { KitchenProfileCardProps } from "@/types/kitchenType";
import { CheckCircle, MapPin } from "lucide-react";
import Image from "next/image";

const KitchenProfile = ({
  kitchenInfo,
}: {
  kitchenInfo: KitchenProfileCardProps;
}) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden">
        <div className="md:flex">
          <div>
            <Image
              src={kitchenInfo?.kitchenPhoto}
              alt="Profile"
              width={900}
              height={900}
              className=" border-4 border-white shadow-md "
            />
          </div>
          <div className="md:w-2/3 p-6 space-y-4">
            <h2 className="text-2xl font-bold text-green-800">
              {kitchenInfo?.kitchenName}
              <span className="ml-2 text-sm text-gray-500">
                ({kitchenInfo?.kitchenType})
              </span>
            </h2>

            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-2" /> {kitchenInfo?.location}
            </div>

            {kitchenInfo?.hygieneCertified && (
              <div className="flex items-center text-green-600 font-medium">
                <CheckCircle className="w-5 h-5 mr-2" /> Hygiene Certified
              </div>
            )}

            {kitchenInfo?.licenseOrCertificate && (
              <div className="text-sm text-gray-600">
                License:{" "}
                <iframe
                  src={`${kitchenInfo?.licenseOrCertificate}?attachment=false`}
                  width="100%"
                  height="600px"
                />
              </div>
            )}

            <div>
              <h3 className="font-semibold text-gray-800">Experience:</h3>
              <p className="text-sm text-gray-700">
                {kitchenInfo?.foodHandlerExperience}
              </p>
            </div>

            {kitchenInfo?.foodPreference!.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800">
                  Food Preferences:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {kitchenInfo?.foodPreference!.map((item, index) => (
                    <div
                      key={index}
                      className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-gray-800">
                Meal Times Per Day:
              </h3>
              <div className="flex flex-wrap gap-2">
                {kitchenInfo?.mealTimePerDay.map((meal, index) => (
                  <div
                    key={index}
                    className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {meal}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Cooking Days:</h3>
              <div className="flex flex-wrap gap-2">
                {kitchenInfo?.cookingDays.map((day, index) => (
                  <div
                    key={index}
                    className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm"
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {kitchenInfo?.specialEquipments!.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800">
                  Special Equipments:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {kitchenInfo?.specialEquipments!.map((item, index) => (
                    <div
                      key={index}
                      className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenProfile;
