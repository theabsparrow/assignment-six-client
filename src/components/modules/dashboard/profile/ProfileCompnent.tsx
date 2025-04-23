"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCamera,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { GiCookingGlove } from "react-icons/gi";
import { TUpdatedUserData, TUserData, TUserInfo } from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { calculateAge } from "@/utills/calculateAge";
import { USER_ROLE } from "@/constant";
import Link from "next/link";
import { TAlergies } from "@/types/customerRegistration";
import { allergyOptions } from "../../auth/register/register.const";
import {
  updateCustomerProfile,
  updateMealProviderProfile,
} from "@/services/profileService";
import { toast } from "sonner";
import { imageUpload } from "@/utills/imageUploader";

const ProfileCompnent = ({
  user,
  userdata,
}: {
  user: TUserInfo;
  userdata: Partial<TUserData>;
}) => {
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [experience, setExperience] = useState(userdata?.experienceYears ?? 0);

  const [isEditingCertified, setIsEditingCertified] = useState(false);
  const [isCertified, setIsCertified] = useState(
    userdata?.isCertified ?? false
  );

  const [isEditingLicense, setIsEditingLicense] = useState(false);
  const [licenseDocument, setLicenseDocument] = useState(
    userdata?.licenseDocument ?? ""
  );

  const [isEditing, setIsEditing] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState<TAlergies[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [backupAllergies, setBackupAllergies] = useState<TAlergies[]>([]);
  const [availableAllergies, setAvailableAllergies] = useState<TAlergies[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const allergies: TAlergies[] = userdata?.allergies ?? [];
    setSelectedAllergies(allergies as TAlergies[]);
    setAvailableAllergies(
      allergyOptions.filter((item) => !allergies.includes(item))
    );
  }, [userdata?.allergies]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("faild to upload image", { duration: 3000 });
      return;
    }
    try {
      const imageUrl = await imageUpload(file);
      if (!imageUrl) {
        toast.error("faild to upload image", { duration: 3000 });
        return;
      }
      if (user?.role === USER_ROLE.mealProvider) {
        const updatedData = { profileImage: imageUrl };
        const result = await updateMealProviderProfile(updatedData);
        if (result?.success) {
          toast.success(result?.message, { duration: 3000 });
        } else {
          toast.error(result?.message, { duration: 3000 });
        }
        return;
      }
      if (user?.role === USER_ROLE.admin || user?.role === USER_ROLE.customer) {
        const updatedData = { profileImage: imageUrl };
        const result = await updateCustomerProfile(updatedData);
        if (result?.success) {
          toast.success(result?.message, { duration: 3000 });
        } else {
          toast.error(result?.message, { duration: 3000 });
        }
        return;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const toggleExperienceEdit = () => {
    setIsEditingExperience(!isEditingExperience);
    setExperience(userdata?.experienceYears as number);
  };

  const toggleCertifiedEdit = () => {
    setIsEditingCertified(!isEditingCertified);
    setIsCertified(userdata?.isCertified as boolean);
  };

  const toggleLicenseEdit = () => {
    setIsEditingLicense(!isEditingLicense);
    setLicenseDocument(userdata?.licenseDocument as string);
  };

  const handleEditToggle = () => {
    if (isEditing && userdata?.allergies?.length) {
      const addedItems: TAlergies[] = selectedAllergies.filter(
        (item) => !userdata?.allergies!.includes(item)
      );
      const removedItems: TAlergies[] = userdata?.allergies!.filter(
        (item) => !selectedAllergies.includes(item)
      );

      if (addedItems.length > 0 || removedItems.length > 0) {
        handleSubmit(" ", addedItems, removedItems);
      }
    } else {
      setBackupAllergies([...selectedAllergies]);
    }

    setIsEditing(!isEditing);
  };

  const handleRemove = (item: TAlergies) => {
    setSelectedAllergies(selectedAllergies.filter((a) => a !== item));
    setAvailableAllergies([...availableAllergies, item]);
  };

  const handleAdd = (item: TAlergies) => {
    setSelectedAllergies([...selectedAllergies, item]);
    setAvailableAllergies(availableAllergies.filter((a) => a !== item));
  };

  const handleSubmit = async (
    field: string,
    addAllergies: TAlergies[] | [],
    removeAllergies: TAlergies[]
  ) => {
    const updatedData: Partial<TUpdatedUserData> = {};
    if (user?.role === USER_ROLE.mealProvider) {
      if (field === "experience") {
        updatedData.experienceYears = experience;
        setIsEditingExperience(false);
      }
      if (field === "certified") {
        updatedData.isCertified = isCertified;
        setIsEditingCertified(false);
      }
      if (field === "license") {
        updatedData.licenseDocument = licenseDocument;
        setIsEditingLicense(false);
      }
      try {
        const result = await updateMealProviderProfile(updatedData);
        if (result?.success) {
          toast.success(result?.message, { duration: 3000 });
        } else {
          toast.error(result?.message, { duration: 3000 });
        }
      } catch (error: any) {
        console.log(error);
      }
      return;
    }

    if (user?.role === USER_ROLE.customer) {
      if (addAllergies?.length > 0) {
        updatedData.addAllergies = addAllergies;
      }
      if (removeAllergies.length > 0) {
        updatedData.removeAllergies = removeAllergies;
      }
      try {
        const result = await updateCustomerProfile(updatedData);
        if (result?.success) {
          toast.success(result?.message, { duration: 3000 });
        } else {
          toast.error(result?.message, { duration: 3000 });
        }
        return;
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div className="col-span-2 flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-indigo-100 to-blue-100 shadow-lg rounded-2xl">
        <label className="relative group cursor-pointer">
          {userdata?.profileImage ? (
            <Image
              src={userdata?.profileImage}
              alt="Profile"
              width={400}
              height={400}
              className="rounded-full object-cover border-4 border-white shadow-md h-72 w-72"
            />
          ) : (
            <div className="rounded-full border-4 border-white shadow-md h-72 w-72 bg-green-500"></div>
          )}

          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100  transition duration-500">
            <FaCamera className="text-white text-2xl" />
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold text-indigo-900 dark:text-indigo-300">
            {userdata?.name || "Unknown User"}
          </h2>
          <p className="text-lg font-light text-gray-500 italic mt-2">
            {userdata?.bio || "No bio provided."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition rounded-full">
              {user?.role}
            </span>
            {userdata?.gender && (
              <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-800 hover:bg-green-700 transition rounded-full">
                {userdata?.gender}
              </span>
            )}
            {userdata?.dateOfBirth && (
              <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition rounded-full">
                {new Date(userdata?.dateOfBirth).toDateString()}
              </span>
            )}
            {userdata?.dateOfBirth && (
              <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition rounded-full">
                {new Date(userdata?.dateOfBirth).toDateString()} (
                {calculateAge(userdata?.dateOfBirth)} years old)
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-100 to-indigo-200 shadow-lg rounded-xl">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-indigo-800">
              {" "}
              Contact Information
            </h3>
            <Link
              className="bg-purple-500 px-2 py-1 rounded-xl text-white hover:bg-indigo-800 dark:bg-gray-500 duration-500"
              href="/settings"
            >
              {" "}
              Settings{" "}
            </Link>
          </div>

          <p className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 ease-in-out">
            <FaEnvelope className="text-blue-500" />
            <span>{user?.email}</span>
          </p>

          <p className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-green-50 transition duration-300 ease-in-out">
            <FaPhoneAlt className="text-green-500" />
            <span>{user?.phone}</span>
          </p>

          <p className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-yellow-50 transition duration-300 ease-in-out">
            <FaMapMarkerAlt className="text-yellow-500" />
            <span>{userdata?.address || "Not Provided"}</span>
          </p>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-teal-100 to-cyan-200 shadow-lg rounded-xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-indigo-800">Details</h3>
          {user?.role === USER_ROLE.mealProvider && !userdata?.hasKitchen && (
            <Link
              className="bg-purple-500 px-2 py-1 rounded-xl text-white hover:bg-indigo-800 dark:bg-gray-500 duration-500"
              href="/mealProvider/myKitchen"
            >
              {" "}
              Create Kitchen{" "}
            </Link>
          )}
        </div>
        {user?.role === USER_ROLE.mealProvider && (
          <>
            <div className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-green-50 transition duration-300 ease-in-out">
              <GiCookingGlove className="text-green-600" />
              <span>Kitchen : {userdata?.hasKitchen ? "Yes" : "No"}</span>
            </div>

            <div className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-teal-50 transition duration-300 ease-in-out">
              {isEditingExperience ? (
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(Number(e.target.value))}
                  className="w-20 px-2 py-1 border rounded-md outline-none"
                />
              ) : (
                <span>Experience: {userdata?.experienceYears} years</span>
              )}
              {isEditingExperience ? (
                <>
                  <button
                    onClick={() => {
                      handleSubmit("experience", [], []);
                    }}
                    className="ml-4 text-teal-500 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={toggleExperienceEdit}
                    className="ml-4 text-teal-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleExperienceEdit}
                  className="ml-4 text-teal-500 cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 ease-in-out">
              {isEditingCertified ? (
                <select
                  value={isCertified ? "Yes" : "No"}
                  onChange={(e) => setIsCertified(e.target.value === "Yes")}
                  className="px-2 py-1 shadow-lg rounded-md outline-none"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <>
                  <MdVerified className="text-blue-500" />
                  <span>Certified: {userdata?.isCertified ? "Yes" : "No"}</span>
                </>
              )}
              {isEditingCertified ? (
                <>
                  <button
                    onClick={() => {
                      handleSubmit("certified", [], []);
                    }}
                    className="ml-4 text-blue-500 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={toggleCertifiedEdit}
                    className="ml-4 text-blue-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleCertifiedEdit}
                  className="ml-4 text-blue-500 cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>

            {userdata?.licenseDocument && (
              <div className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-purple-50 transition duration-300 ease-in-out">
                {isEditingLicense ? (
                  <input
                    type="text"
                    value={licenseDocument}
                    onChange={(e) => setLicenseDocument(e.target.value)}
                    className="px-2 py-1 border rounded-md w-44"
                  />
                ) : (
                  <>
                    <span>
                      License No:{" "}
                      {userdata?.licenseDocument
                        ? userdata?.licenseDocument
                        : "Not Provided"}
                    </span>
                  </>
                )}
                {isEditingLicense ? (
                  <>
                    <button
                      onClick={() => {
                        handleSubmit("license", [], []);
                      }}
                      className="ml-4 text-blue-500 cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleLicenseEdit}
                      className="ml-4 text-purple-500 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={toggleLicenseEdit}
                    className="ml-4 text-blue-500 cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </>
        )}
        {user?.role === USER_ROLE.customer && (
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-indigo-700">
                Allergies:
              </h4>
              <button
                onClick={handleEditToggle}
                className="text-sm px-3 py-1 rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition"
              >
                {isEditing ? "Done" : "Edit"}
              </button>
            </div>

            {selectedAllergies.length > 0 ? (
              <ul className="flex flex-wrap gap-2 mt-2">
                {selectedAllergies.map((item, i) => (
                  <li
                    key={i}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {item}
                    {isEditing && (
                      <button
                        onClick={() => handleRemove(item)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">None specified</p>
            )}

            {isEditing && availableAllergies.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <select
                  onChange={(e) => {
                    const selected = e.target.value as TAlergies;
                    if (selected) handleAdd(selected);
                    e.target.selectedIndex = 0;
                  }}
                  className="border px-3 py-1 rounded text-sm"
                >
                  <option value="">Select allergy to add</option>
                  {availableAllergies.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCompnent;
