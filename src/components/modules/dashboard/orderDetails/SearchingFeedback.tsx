"use client";

import { useState } from "react";
import GivingFeedbackComponent from "./GivingFeedbackComponent";
import { TRating } from "@/types/rating.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TSearchingComponent = {
  id: string;
  review: TRating[];
  deliveryCount: number;
  isReview: boolean;
};
const SearchingFeedback = ({
  id,
  review,
  deliveryCount,
  isReview,
}: TSearchingComponent) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [selectedDelivery, setSelectedDelivery] = useState<number | "">(() => {
    const param = searchParams.get("deliveryNumber");
    return param ? Number(param) : "";
  });

  const generateOptions = () => {
    return Array.from({ length: deliveryCount }, (_, i) => {
      const countDelivery = i + 1;
      return (
        <option key={countDelivery} value={countDelivery}>
          {`Feedback for ${countDelivery}${
            countDelivery === 1
              ? "st"
              : countDelivery === 2
              ? "nd"
              : countDelivery === 3
              ? "rd"
              : "th"
          } Delivery`}
        </option>
      );
    });
  };

  const handleChange = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("deliveryNumber", value.toString());
      router.push(`${pathName}?${params.toString()}`, { scroll: false });
    } else {
      router.push(`${pathName}`);
    }
  };

  return (
    <>
      {deliveryCount > 0 && (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select a Delivery
          </label>
          <select
            className=" p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            value={selectedDelivery ?? ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              setSelectedDelivery(value);
              handleChange(value);
            }}
          >
            <option value="">Choose Delivery</option>
            {generateOptions()}
          </select>
        </div>
      )}
      <GivingFeedbackComponent
        id={id}
        review={review as TRating[]}
        deliveryNumber={deliveryCount}
        selectedDelivery={selectedDelivery as number}
        isReview={isReview}
      />
    </>
  );
};

export default SearchingFeedback;
