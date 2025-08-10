"use client";

import ProfileSceleton from "@/components/sceleton/ProfileSceleton";
import DeletionModal from "@/components/statusDropdown/DeletionModal";
import StatusDropdown from "@/components/statusDropdown/StatusDropdown";
import { USER_ROLE } from "@/constant";
import { deleteUser, updateStatus } from "@/services/userService";
import { TuserProfile } from "@/types";
import { TStatus } from "@/types/subscriber.types";
import { calculateAge } from "@/utills/calculateAge";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { GiCookingGlove } from "react-icons/gi";
import { toast } from "sonner";

const UserProfile = ({ data }: { data: TuserProfile }) => {
  const router = useRouter();
  const role = data?.user?.role;
  const id = data?.user?._id;
  const status = data?.user?.status as TStatus;
  const image = data?.profileImage;
  const date = new Date(data?.user?.createdAt);
  const creationDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const creationTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleChange = async (
    option: TStatus,
    setDropdownOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    if (status === option) {
      toast.error(`status is already ${status}`, { duration: 3000 });
      return;
    }
    const data = {
      status: option,
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
      toast.error("falid to remove user", { duration: 3000 });
      setLoading(false);
      return;
    }
    const toastId = toast.loading("Removing user...");
    try {
      const result = await deleteUser(id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setOpen(false);
        setLoading(false);
        router.push("/admin/manageUsers");
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
        <ProfileSceleton />
      ) : (
        <section className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="col-span-2 flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 shadow-lg rounded-2xl">
            <div className="w-full">
              {image ? (
                <Image
                  src={image}
                  alt="Profile"
                  width={1000}
                  height={1000}
                  className=" object-cover border-4 rounded-full border-white shadow-md w-72 h-72 md:w-96 md:h-96"
                />
              ) : (
                <Image
                  src="/profile-icon.png"
                  alt="Profile"
                  width={800}
                  height={800}
                  className="rounded-full object-cover border-4 border-white shadow-md md:w-96 w-72 md:h-96 h-72"
                />
              )}
            </div>
            <div className=" md:text-left space-y-4 w-full">
              <div>
                <h2 className="text-3xl font-semibold">
                  {data?.name || "Unknown User"}
                </h2>
              </div>
              <div className="flex items-center justify-between">
                {data?.user?.verifiedWithEmail ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 mt-1  font-semibold text-green-700 bg-green-100 border border-green-300 rounded-full dark:bg-green-900 dark:text-green-300 dark:border-green-600">
                    <FaCheckCircle className="text-green-500" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 mt-1  font-semibold text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-full dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-600">
                    <FaExclamationTriangle className="text-yellow-500" />
                    Not Verified
                  </span>
                )}
                <StatusDropdown
                  status={status}
                  options={["active", "blocked"]}
                  handleChange={handleChange}
                />
              </div>
              {role === USER_ROLE.mealProvider && data?.bio && (
                <div>
                  <p className="text-lg font-light italic mt-2">
                    {data?.bio || "No bio provided."}
                  </p>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-3 justify-between md:justify-start">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-primary transition rounded-full">
                  {role}
                </span>
                <span className="inline-block px-4 py-2 text-sm font-medium bg-secondary text-primary transition rounded-full">
                  {data?.gender}
                </span>
              </div>
              <div>
                <span className="inline-block px-4 py-2 text-sm font-medium text-secondary bg-primary transition rounded-full">
                  {new Date(data?.dateOfBirth as string).toDateString()} (
                  {calculateAge(data?.dateOfBirth as string)} years old)
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold"> Account Creation :</h1>{" "}
                <span className="px-4 py-2 font-medium text-white bg-primary transition rounded-full ">
                  {creationDate}, {creationTime}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="p-6 bg-gradient-to-r from-blue-100 to-indigo-200 shadow-lg rounded-xl w-full">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-indigo-800">
                  {" "}
                  Contact Information
                </h3>
                <p className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 ease-in-out">
                  <FaEnvelope className="text-blue-500" />
                  <span>{data?.user?.email}</span>
                </p>
                <p className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-green-50 transition duration-300 ease-in-out">
                  <FaPhoneAlt className="text-green-500" />
                  <span>{data?.user?.phone}</span>
                </p>

                <div className=" bg-white px-4 py-3 rounded-lg shadow-md hover:bg-yellow-50 transition duration-300 ease-in-out">
                  <p className="flex items-center gap-3 text-lg font-medium text-gray-800 ">
                    <FaMapMarkerAlt className="text-yellow-500" />
                    <span>{data?.address || "Not Provided"}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-teal-100 to-cyan-200 shadow-lg rounded-xl space-y-6 w-full">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-indigo-800">
                  Details
                </h3>
                {role === USER_ROLE.mealProvider && (
                  <div>
                    {data?.hasKitchen ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-green-50 transition duration-300 ease-in-out">
                          <GiCookingGlove className="text-green-600" />
                          <span>
                            Kitchen : {data?.hasKitchen ? "Yes" : "No"}
                          </span>
                        </div>
                        <Link
                          className="bg-secondary px-2 py-2 rounded-xl border border-primary text-primary text-lg font-medium hover:bg-primary hover:text-white dark:bg-gray-500 duration-500"
                          href="/mealProvider/myKitchen"
                        >
                          view kitchen
                        </Link>
                      </div>
                    ) : (
                      <h1>
                        <span className="text-lg font-bold">{data?.name}</span>{" "}
                        has no kitchen, yet
                      </h1>
                    )}
                  </div>
                )}
              </div>
              {role === USER_ROLE.mealProvider && (
                <div className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-teal-50 transition duration-300 ease-in-out">
                  <h1>Experience: {data?.experienceYears} years</h1>
                </div>
              )}

              {(role === USER_ROLE.customer || role === USER_ROLE.admin) &&
                data?.allergies && (
                  <div className="space-y-2">
                    <h1 className="font-semibold text-xl">Allergies:</h1>
                    <ul className="flex flex-wrap gap-2 ">
                      {(data?.allergies).map((allergy, i) => (
                        <li
                          key={i}
                          className="bg-primary text-secondary px-2 py-1 rounded-xl"
                        >
                          {allergy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
          <DeletionModal
            name={data?.name}
            collection="Users"
            handleDelete={handleDelete}
          />
        </section>
      )}
    </>
  );
};

export default UserProfile;
