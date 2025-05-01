import { KitchenProfileCardProps } from "@/types/kitchenType";
import { BadgeCheck, XCircle } from "lucide-react";
import Image from "next/image";

const KitchenCard = ({
  kitchenData,
}: {
  kitchenData: KitchenProfileCardProps;
}) => {
  console.log(kitchenData);
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden max-w-sm w-full transition hover:shadow-lg">
      <div className="relative h-48 w-full">
        {kitchenData?.kitchenPhotos ? (
          <Image
            src={kitchenData.kitchenPhotos}
            alt={kitchenData?.kitchenName || "Kitchen Image"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-200 flex items-center justify-center h-full text-gray-500 text-sm">
            No Image Available
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {kitchenData?.kitchenName}
          </h2>
          <span
            className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full font-medium ${
              kitchenData?.isActive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {kitchenData?.isActive ? (
              <>
                <BadgeCheck size={14} /> Active
              </>
            ) : (
              <>
                <XCircle size={14} /> Inactive
              </>
            )}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {kitchenData?.location}
        </p>
      </div>
    </div>
  );
};

export default KitchenCard;
