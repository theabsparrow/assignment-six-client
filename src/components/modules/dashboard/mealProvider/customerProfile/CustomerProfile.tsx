import { TuserProfile } from "@/types";
import { calculateAge } from "@/utills/calculateAge";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const CustomerProfile = ({ customerData }: { customerData: TuserProfile }) => {
  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="col-span-2 flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 shadow-lg rounded-2xl">
        <div className="w-full">
          {customerData?.profileImage ? (
            <Image
              src={customerData?.profileImage}
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
            <h2 className="text-3xl font-semibold">{customerData?.name}</h2>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 justify-between md:justify-start">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-secondary text-primary transition rounded-full">
              {customerData?.gender}
            </span>
            <span className="inline-block px-4 py-2 text-sm font-medium text-secondary bg-primary transition rounded-full">
              {calculateAge(customerData?.dateOfBirth as string)} years old
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
            <p className="flex items-center gap-3 text-lg font-medium text-gray-800 bg-white px-4 py-3 rounded-lg shadow-md hover:bg-green-50 transition duration-300 ease-in-out">
              <FaPhoneAlt className="text-green-500" />
              <span>{customerData?.user?.phone}</span>
            </p>
            <div className=" bg-white px-4 py-3 rounded-lg shadow-md hover:bg-yellow-50 transition duration-300 ease-in-out">
              <p className="flex items-center gap-3 text-lg font-medium text-gray-800 ">
                <FaMapMarkerAlt className="text-yellow-500" />
                <span>{customerData?.address}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-teal-100 to-cyan-200 shadow-lg rounded-xl space-y-6 w-full">
          <h3 className="text-2xl font-semibold text-indigo-800">Details</h3>
          {customerData?.allergies && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Allergies:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(customerData?.allergies).map((allergy, i) => (
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
    </section>
  );
};

export default CustomerProfile;
