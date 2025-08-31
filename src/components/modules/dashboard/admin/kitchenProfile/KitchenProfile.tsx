"use client";

import KitchenProfileSceleton from "@/components/sceleton/KitchenProfileSceleton";
import DeletionModal from "@/components/statusDropdown/DeletionModal";
import StatusDropdown from "@/components/statusDropdown/StatusDropdown";
import { deleteKitchen, updateStatus } from "@/services/kitchenService";
import { TKitchenProfile } from "@/types/kitchenType";
import { TStatus } from "@/types/subscriber.types";
import { convertDate } from "@/utills/dateConverter";
import { CheckCircle, CircleX, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { CgProfile } from "react-icons/cg";
import { toast } from "sonner";

type TKitchenProfileProps = {
  isKitchenExists: TKitchenProfile;
  totalMeal: number;
};

const KitchenProfile = ({ data }: { data: TKitchenProfileProps }) => {
  const { isKitchenExists, totalMeal } = data;
  const id = isKitchenExists?._id;
  const status = isKitchenExists?.isActive ? "active" : "blocked";
  const date = convertDate(new Date(isKitchenExists?.createdAt));

  const handleChange = async (
    option: TStatus,
    setDropdownOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    if (!option) {
      toast.error("falid to update status", { duration: 3000 });
      return;
    }
    if (status === option) {
      toast.error(`status is already ${status}`, { duration: 3000 });
      return;
    }
    const value = option === "active";
    const data = {
      isActive: value,
    };
    const toastId = toast.loading("updating status...");
    try {
      const result = await updateStatus(id, data);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setDropdownOpen(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    setLoading(true);
    if (!id) {
      toast.error("falid to remove kitchen", { duration: 3000 });
      setLoading(false);
      return;
    }
    const toastId = toast.loading("Removing kitchen...");
    try {
      const result = await deleteKitchen(id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
    setLoading(true);
  };

  return (
    <>
      {!data ? (
        <KitchenProfileSceleton />
      ) : (
        <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden max-w-4xl mx-auto px-4 md:px-10 py-4 space-y-4 md:space-y-10">
          <div>
            <Image
              src={isKitchenExists?.kitchenPhoto}
              alt="Profile"
              width={900}
              height={900}
              className=" border-4 border-white w-full md:h-[70vh] shadow-xl rounded-xl"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {isKitchenExists?.kitchenName}{" "}
                <span className="text-xl">
                  ({isKitchenExists?.kitchenType})
                </span>
              </h2>
            </div>
            {isKitchenExists?.licenseOrCertificate && (
              <div>
                <Link
                  href={isKitchenExists?.licenseOrCertificate}
                  className="text-blue-600 hover:underline font-semibold"
                  target="_blank"
                >
                  View License
                </Link>
              </div>
            )}
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:gap-2">
              <div
                className={`flex items-center font-medium ${
                  isKitchenExists?.hygieneCertified
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {isKitchenExists?.hygieneCertified ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <CircleX className="w-5 h-5 mr-2" />
                )}
                <h1>
                  Hygiene{" "}
                  {isKitchenExists?.hygieneCertified
                    ? "Certified"
                    : "Not Certified"}
                </h1>
              </div>
              {isKitchenExists?.hygieneCertificate && (
                <Link
                  href={isKitchenExists.hygieneCertificate}
                  className="text-blue-600 hover:underline font-semibold"
                  target="_blank"
                >
                  ( View Hygiene Certificate)
                </Link>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-start md:justify-between gap-2 md:gap-0">
              <h1 className="flex items-center text-base text-gray-700">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-green-700" />
                <span>
                  {isKitchenExists?.location || "No location provided"}
                </span>
              </h1>

              <h1 className="bg-primary border border-secondary px-2 py-1 rounded-full text-white flex items-center">
                Subscribers: {isKitchenExists?.subscriber}
              </h1>

              <h1 className="bg-primary border border-secondary px-2 py-1 rounded-full text-white">
                Total Meals: {totalMeal}
              </h1>

              <StatusDropdown
                status={status as TStatus}
                options={["active", "blocked"]}
                handleChange={handleChange}
              />

              <Link
                href={`/admin/manageUsers/${isKitchenExists?.owner?._id}`}
                className="bg-secondary text-primary px-2 py-1 rounded-xl hover:bg-primary hover:text-white cursor-pointer border border-primary duration-500  flex items-center gap-1"
              >
                <CgProfile /> Owner Profile
              </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:gap-10 space-y-4 md:space-y-0">
              <div className="space-y-1">
                <h1 className="text-lg font-semibold"> Kitchen Creation</h1>
                <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
                  {date?.creationDate}, {date?.creationTime}
                </span>
              </div>
              <div className="space-y-1">
                <h1 className="text-lg font-semibold"> Kitchen Owner</h1>
                <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
                  {isKitchenExists?.owner?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:gap-10 space-y-4 md:space-y-0">
              {isKitchenExists?.foodPreference && (
                <div className="space-y-2">
                  <h1 className="font-semibold text-xl">Food Preference:</h1>
                  <ul className="flex flex-wrap gap-2 ">
                    {(isKitchenExists?.foodPreference).map((preference, i) => (
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
              {isKitchenExists?.mealTimePerDay && (
                <div className="space-y-2">
                  <h1 className="font-semibold text-xl">Meal Time:</h1>
                  <ul className="flex flex-wrap gap-2 ">
                    {(isKitchenExists?.mealTimePerDay).map((mealTime, i) => (
                      <li
                        key={i}
                        className="bg-primary text-secondary px-2 py-1 rounded-xl"
                      >
                        {mealTime}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {isKitchenExists?.cookingDays && (
              <div className="space-y-2">
                <h1 className="font-semibold text-xl">Cooking Day:</h1>
                <ul className="flex flex-wrap gap-2 ">
                  {(isKitchenExists?.cookingDays).map((cookingDay, i) => (
                    <li
                      key={i}
                      className="bg-primary text-secondary px-2 py-1 rounded-xl"
                    >
                      {cookingDay}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isKitchenExists?.specialEquipments && (
              <div className="space-y-2">
                <h1 className="font-semibold text-xl">Special Equipment:</h1>
                <ul className="flex flex-wrap gap-2 ">
                  {(isKitchenExists?.specialEquipments).map(
                    (specialEquipment, i) => (
                      <li
                        key={i}
                        className="bg-primary text-secondary px-2 py-1 rounded-xl"
                      >
                        {specialEquipment}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>

          <DeletionModal
            name={isKitchenExists?.kitchenName}
            collection="Kitchens"
            handleDelete={handleDelete}
          />
        </section>
      )}
    </>
  );
};

export default KitchenProfile;
