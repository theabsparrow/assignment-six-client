"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { GiCookingGlove } from "react-icons/gi";
import { TUpdatedUserData, TUserData, TUserInfo } from "@/types";
import { useState } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditComponent from "../editComponent/EditComponent";
import ImageSection from "./ImageSection";
import EditArray from "../editArrayComponent/EditArray";

const ProfileCompnent = ({
  user,
  userdata,
}: {
  user: TUserInfo;
  userdata: Partial<TUserData>;
}) => {
  // name state
  const [isNameEditing, setIsEditingName] = useState(false);
  const [name, setName] = useState(userdata?.name ?? "");
  // bio state
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(userdata?.bio ?? "");
  // date state
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(userdata?.dateOfBirth as string) ?? ""
  );
  // adress state
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [address, setAddress] = useState(userdata?.address ?? "");
  // experience state
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [experience, setExperience] = useState(userdata?.experienceYears ?? 0);

  const handleSubmit = async (
    field: string,
    addOptions: TAlergies[] | [],
    removeOptions: TAlergies[]
  ) => {
    const updatedData: Partial<TUpdatedUserData> = {};
    if (field === "name") {
      updatedData.name = name;
    }
    if (field === "address") {
      updatedData.address = address;
    }
    if (field === "date") {
      updatedData.dateOfBirth = selectedDate?.toString();
    }

    if (user?.role === USER_ROLE.mealProvider) {
      console.log(updatedData);
      if (field === "experience") {
        updatedData.experienceYears = experience;
        setIsEditingExperience(false);
      }
      if (field === "bio") {
        updatedData.bio = bio;
        setIsEditingBio(false);
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
      if (addOptions?.length > 0) {
        updatedData.addAllergies = addOptions;
      }
      if (removeOptions.length > 0) {
        updatedData.removeAllergies = removeOptions;
      }
      try {
        const result = await updateCustomerProfile(updatedData);
        if (result?.success) {
          toast.success(result?.message, { duration: 3000 });
        } else {
          toast.error(result?.message, { duration: 3000 });
        }
      } catch (error: any) {
        console.log(error);
      }
    }
    return;
  };

  return (
    <section className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {/* personal info starts here*/}
      <div className="col-span-2 flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 shadow-lg rounded-2xl">
        <ImageSection
          image={userdata?.profileImage as string}
          role={user?.role}
        />
        <div className="text-center md:text-left space-y-4">
          <div>
            {isNameEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            ) : (
              <h2 className="text-3xl font-semibold text-indigo-900 dark:text-indigo-300">
                {userdata?.name || "Unknown User"}
              </h2>
            )}
            <EditComponent
              setValue={setName}
              isEditing={isNameEditing}
              setIsEditing={setIsEditingName}
              value={userdata?.name as string}
              handleSubmit={handleSubmit}
              field="name"
            />
          </div>
          <div>
            {user?.verifiedWithEmail ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 mt-1 text-sm font-semibold text-green-700 bg-green-100 border border-green-300 rounded-full dark:bg-green-900 dark:text-green-300 dark:border-green-600">
                <FaCheckCircle className="text-green-500" />
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 mt-1 text-sm font-semibold text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-full dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-600">
                <FaExclamationTriangle className="text-yellow-500" />
                Not Verified
              </span>
            )}
          </div>
          {user?.role === USER_ROLE.mealProvider && (
            <div>
              {isEditingBio ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="px-2 py-1 border rounded-md w-66 h-24 resize-none outline-none"
                />
              ) : (
                <p className="text-lg font-light text-gray-500 italic mt-2">
                  {userdata?.bio || "No bio provided."}
                </p>
              )}
              <EditComponent
                setValue={setBio}
                isEditing={isEditingBio}
                setIsEditing={setIsEditingBio}
                value={userdata?.bio as string}
                handleSubmit={handleSubmit}
                field="bio"
              />
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition rounded-full">
              {user?.role}
            </span>
            {userdata?.gender && (
              <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-800 hover:bg-green-700 transition rounded-full">
                {userdata?.gender}
              </span>
            )}
          </div>
          <div>
            {isEditingDate ? (
              <div className="flex items-center gap-2">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date as Date);
                    const age = calculateAge(date?.toDateString() as string);
                    if (age < 18) {
                      toast.error("your age should be over 18", {
                        duration: 3000,
                      });
                      setSelectedDate(new Date(userdata.dateOfBirth as string));
                      return;
                    }
                  }}
                  dateFormat="yyyy-MM-dd"
                  className="border p-2 rounded"
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableYearDropdown
                />
              </div>
            ) : (
              <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-purple-600  transition rounded-full">
                {new Date(userdata.dateOfBirth as string).toDateString()} (
                {calculateAge(userdata.dateOfBirth as string)} years old)
              </span>
            )}
            <EditComponent
              setValue={setSelectedDate}
              isEditing={isEditingDate}
              setIsEditing={setIsEditingDate}
              value={new Date(userdata.dateOfBirth as string)}
              handleSubmit={handleSubmit}
              field="date"
              saveClass="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition cursor pointer ml-4"
              cancelClass="px-3 py-1 bg-purple-500 text-white rounded hover:bg-gray-500 transition cursor pointer ml-4"
            />
          </div>
        </div>
      </div>
      {/* personal info ends here */}

      {/* contact info starts here */}
      <div className="p-6 bg-gradient-to-r from-blue-100 to-indigo-200 shadow-lg rounded-xl">
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
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

          <div className=" bg-white px-4 py-3 rounded-lg shadow-md hover:bg-yellow-50 transition duration-300 ease-in-out">
            {isAddressEditing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="px-2 py-1 border rounded-md w-44"
              />
            ) : (
              <p className="flex items-center gap-3 text-lg font-medium text-gray-800 ">
                <FaMapMarkerAlt className="text-yellow-500" />
                <span>{userdata?.address || "Not Provided"}</span>
              </p>
            )}
            <EditComponent
              setValue={setAddress}
              isEditing={isAddressEditing}
              setIsEditing={setIsAddressEditing}
              value={userdata?.address as string}
              handleSubmit={handleSubmit}
              field="address"
            />
          </div>
        </div>
      </div>
      {/* contact info ends here */}

      {/* detailed information starts here */}
      <div className="p-6 bg-gradient-to-r from-teal-100 to-cyan-200 shadow-lg rounded-xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-indigo-800">Details</h3>
          {user?.role === USER_ROLE.mealProvider && (
            <Link
              className="bg-purple-500 px-2 py-1 rounded-xl text-white hover:bg-indigo-800 dark:bg-gray-500 duration-500"
              href="/mealProvider/myKitchen"
            >
              {userdata?.hasKitchen ? "View Kitchen" : "Create Kitchen"}
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
              <EditComponent
                setValue={setExperience}
                isEditing={isEditingExperience}
                setIsEditing={setIsEditingExperience}
                value={userdata?.experienceYears as number}
                handleSubmit={handleSubmit}
                field="experience"
              />
            </div>
          </>
        )}
        {user?.role === USER_ROLE.customer && (
          <EditArray
            value={userdata?.allergies as TAlergies[]}
            valueOptions={allergyOptions}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      {/* detailed information ends here */}
    </section>
  );
};

export default ProfileCompnent;
