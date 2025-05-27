"use client";

import {
  KitchenProfileCardProps,
  TKitchen,
  TKitchenType,
} from "@/types/kitchenType";
import { CheckCircle, CircleX, MapPin } from "lucide-react";
import ImageUploadKitchen from "./ImageUploadKitchen";
import Link from "next/link";
import { useState } from "react";
import EditComponent from "../editComponent/EditComponent";
import { kitchenType } from "./kitchen.const";
import PdfUploader from "../../pdfUploader/PdfUploader";
import { toast } from "sonner";

const KitchenProfile = ({
  kitchenInfo,
  verifiedEmail,
}: {
  kitchenInfo: KitchenProfileCardProps;
  verifiedEmail: boolean;
}) => {
  // kitchen name
  const [isKitchenNameEditing, setIsKitchenNameEditing] = useState(false);
  const [KitchenName, setKitchenName] = useState(
    kitchenInfo?.kitchenName ?? ""
  );

  // kitchen type and lisence
  const [isTypeEditing, setIsTypeEditing] = useState(false);
  const [typeofKitchen, setTypeofKitchen] = useState(
    kitchenInfo?.kitchenType ?? ""
  );
  const [licensePdfFile, setLicensePdfFile] = useState<File | "">("");

  // address
  const [isLocationEditing, setIsLocationEditing] = useState(false);
  const [location, setLocation] = useState(kitchenInfo?.location ?? "");

  // hygine certified and certificate
  const [isHygineEditing, setIsHygieneEditing] = useState(false);
  const [hygine, setHygiene] = useState<boolean>(kitchenInfo?.hygieneCertified);
  const [hygienePdf, setHygienePdf] = useState<File | "">("");

  const handleSubmit = async (
    field: string,
    addOptions: string[] | [],
    removeOptions: string[]
  ) => {
    if (!verifiedEmail) {
      toast.error("You need to verify your email at first", { duration: 3000 });
      return;
    }

    const updatedData: Partial<TKitchen> = {};
    if (field === "kitchenName") {
      if (KitchenName.trim() === kitchenInfo?.kitchenName) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.kitchenName = KitchenName;
        setIsKitchenNameEditing(false);
      }
    }

    if (field === "location") {
      if (location.trim() === kitchenInfo?.location) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.location = location;
        setIsLocationEditing(false);
      }
    }

    if (field === "kitchenType") {
      if (typeofKitchen == "Commercial" && !licensePdfFile) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      }
      updatedData.kitchenType = typeofKitchen;
      setIsTypeEditing(false);
    }

    if (field === "hygiene") {
      if (hygine && !hygienePdf) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      }
      updatedData.hygieneCertified = hygine;
      setIsHygieneEditing(false);
    }

    const hasEmptyString = Object.values(updatedData).some(
      (value) => typeof value === "string" && value.trim() === ""
    );
    if (hasEmptyString) {
      toast.error("you have to provide a proper value");
      return;
    }
  };

  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden max-w-4xl mx-auto px-10 py-4">
      <div className="flex items-center gap-10">
        <div>
          <ImageUploadKitchen image={kitchenInfo?.kitchenPhoto} />
        </div>

        <div className="space-y-4">
          <div>
            {isKitchenNameEditing ? (
              <input
                type="text"
                value={KitchenName}
                onChange={(e) => {
                  const value = e.target.value;
                  setKitchenName(value);
                }}
                className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            ) : (
              <h2 className="text-2xl font-bold text-green-800">
                {kitchenInfo?.kitchenName}
              </h2>
            )}
            <EditComponent
              setValue={setKitchenName}
              isEditing={isKitchenNameEditing}
              setIsEditing={setIsKitchenNameEditing}
              value={kitchenInfo?.kitchenName as string}
              handleSubmit={handleSubmit}
              field="kitchenName"
            />
          </div>

          <div className="space-y-3">
            <div>
              {isTypeEditing ? (
                <>
                  <select
                    value={typeofKitchen}
                    onChange={(e) =>
                      setTypeofKitchen(e.target.value as TKitchenType)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
                  >
                    {kitchenType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {typeofKitchen === "Commercial" && (
                    <PdfUploader
                      setPdfFile={setLicensePdfFile}
                      label="License Certificate"
                      id="license"
                    />
                  )}
                </>
              ) : (
                <div>
                  <p className="text-base text-gray-600">
                    <span className="font-medium text-gray-800">Type:</span>{" "}
                    {kitchenInfo?.kitchenType || "N/A"}
                  </p>
                  {kitchenInfo?.licenseOrCertificate && (
                    <div className="text-sm">
                      <Link
                        href={kitchenInfo.licenseOrCertificate}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                      >
                        View License
                      </Link>
                    </div>
                  )}
                </div>
              )}
              <EditComponent
                setValue={setTypeofKitchen}
                isEditing={isTypeEditing}
                setIsEditing={setIsTypeEditing}
                value={kitchenInfo?.kitchenType as TKitchenType}
                handleSubmit={handleSubmit}
                field="kitchenType"
              />
            </div>
          </div>

          <div>
            {isLocationEditing ? (
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocation(value);
                }}
                className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            ) : (
              <h1 className="flex items-start text-base text-gray-700">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-green-700" />
                <span>{kitchenInfo?.location || "No location provided"}</span>
              </h1>
            )}
            <EditComponent
              setValue={setLocation}
              isEditing={isLocationEditing}
              setIsEditing={setIsLocationEditing}
              value={kitchenInfo?.location as string}
              handleSubmit={handleSubmit}
              field="location"
            />
          </div>

          <div className="space-y-3">
            {isHygineEditing ? (
              <>
                <label
                  htmlFor="hygieneCertified"
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={hygine}
                        onChange={(e) => setHygiene(e.target.checked)}
                        id="hygieneCertified"
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300" />
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5" />
                    </div>
                  </div>
                </label>
                {hygine && (
                  <PdfUploader
                    setPdfFile={setHygienePdf}
                    label="Hygiene Certificate"
                    id="hygiene-upload"
                  />
                )}
              </>
            ) : (
              <>
                <div
                  className={`flex items-center font-medium ${
                    kitchenInfo?.hygieneCertified
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {kitchenInfo?.hygieneCertified ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <CircleX className="w-5 h-5 mr-2" />
                  )}

                  <h1>
                    Hygiene{" "}
                    {kitchenInfo?.hygieneCertified
                      ? "Certified"
                      : "Not Certified"}
                  </h1>
                </div>
                {kitchenInfo?.hygieneCertificate && (
                  <div className="text-sm">
                    <Link
                      href={kitchenInfo.hygieneCertificate}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      View Hygiene Certificate
                    </Link>
                  </div>
                )}
              </>
            )}
            <EditComponent
              setValue={setHygiene}
              isEditing={isHygineEditing}
              setIsEditing={setIsHygieneEditing}
              value={kitchenInfo?.hygieneCertified}
              handleSubmit={handleSubmit}
              field="hygiene"
            />
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-4 mt-4 space-y-4">
        {kitchenInfo?.foodPreference.length && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">Food Preferences:</h3>
            <div className="flex flex-wrap gap-2">
              {kitchenInfo?.foodPreference.map((item, index) => (
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

        {kitchenInfo?.mealTimePerDay.length && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">Meal Times Per Day:</h3>
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
        )}

        {kitchenInfo?.cookingDays.length && (
          <div className="space-y-2">
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
        )}

        {kitchenInfo?.specialEquipments!.length && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">Special Equipments:</h3>
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
    </section>
  );
};

export default KitchenProfile;
