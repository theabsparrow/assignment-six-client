"use client";
import { TKitchenDetails } from "@/types/kitchenType";
import Image from "next/image";
import { CheckCircle, MapPin } from "lucide-react";
import SubscribedButton from "./SubscribedButton";
import { TMealFormData } from "@/types/mealType";
import MealCard from "../mealCard/MealCard";

type TKitchenProfileProps = {
  result: TKitchenDetails;
  totalMeal: number;
  topMeals?: TMealFormData[];
  subscribed: boolean;
};

const KitchenDetails = ({ data }: { data: TKitchenProfileProps }) => {
  const { result, totalMeal, topMeals, subscribed } = data;
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden max-w-4xl mx-auto px-4 md:px-10 py-4 space-y-4 md:space-y-4">
        <div>
          <Image
            src={result?.kitchenPhoto}
            alt="Profile"
            width={900}
            height={900}
            className=" border-4 border-white w-full md:h-[70vh] shadow-xl rounded-xl"
          />
        </div>
        <div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {result?.kitchenName}{" "}
              <span className="text-xl">({result?.kitchenType})</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:gap-2">
            <div
              className={`flex items-center font-medium ${
                result?.hygieneCertified
                  ? "text-green-600"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {result?.hygieneCertified && (
                <CheckCircle className="w-5 h-5 mr-2" />
              )}
              <h1>
                Hygiene{" "}
                {result?.hygieneCertified
                  ? "Certified"
                  : "Certification Pending"}
              </h1>
            </div>
          </div>
          <h1 className="font-medium text-lg py-1 px-2 rounded-xl flex">
            {result?.subscriber}{" "}
            {result?.subscriber > 1 ? "Subscribers" : "Subscriber"}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-0">
            <h1 className="flex items-center text-base text-gray-700">
              <MapPin className="w-5 h-5 mr-2 mt-0.5 text-green-700" />
              <span>{result?.location || "No location provided"}</span>
            </h1>
            <h1 className="bg-primary border border-secondary px-2 py-1 rounded-full text-white">
              Total Meals: {totalMeal}
            </h1>
            <SubscribedButton kitchenId={result?._id} subscribed={subscribed} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:gap-10 space-y-4 md:space-y-0">
            {result?.foodPreference && (
              <div className="space-y-2">
                <h1 className="font-semibold text-xl">Food Preference:</h1>
                <ul className="flex flex-wrap gap-2 ">
                  {(result?.foodPreference).map((preference, i) => (
                    <li
                      key={i}
                      className="bg-primary text-secondary px-2 py-1 rounded-xl"
                    >
                      {preference}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {result?.specialEquipments && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Special Equipment:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(result?.specialEquipments).map((specialEquipment, i) => (
                  <li
                    key={i}
                    className="bg-primary text-secondary px-2 py-1 rounded-xl"
                  >
                    {specialEquipment}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      {topMeals && topMeals?.length > 0 && (
        <div className="mt-3 md:mt-6 space-y-4 mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center">
            Top Rated meal of this Kitchen
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 justify-center">
            {topMeals.map((item: TMealFormData) => (
              <MealCard key={item._id} meal={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default KitchenDetails;
