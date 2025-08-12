"use client";

import Pagination from "@/components/pagination/Pagination";
import Table from "@/components/table/Table";
import { TMetaDataProps } from "@/types";
import { TMealFormData } from "@/types/mealType";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

const MyMealsComponent = ({
  meta,
  result,
}: {
  meta: TMetaDataProps;
  result: TMealFormData[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    // setDeleteCarId(null);
  };

  const columns: ColumnDef<TMealFormData>[] = [
    { accessorKey: "title", header: "Mean Name" },
    { accessorKey: "cuisineType", header: "Cuisine type" },
    { accessorKey: "foodPreference", header: "Food preference" },
    { accessorKey: "price", header: "Price" },
    {
      accessorKey: "isAvailable",
      header: "Availablity",
      cell: ({ row }) => {
        return (
          <span
            className={`${
              row?.original?.isAvailable
                ? "text-green-700 bg-green-300 rounded-xl p-1"
                : "text-red-700 bg-red-300 rounded-xl p-1"
            }`}
          >
            {row?.original?.isAvailable ? "Yes" : "No"}
          </span>
        );
      },
    },
    // {
    //   accessorKey: "isActive",
    //   header: "Active",
    //   cell: ({ row }) => {
    //     return (
    //       <span
    //         className={`${
    //           row.original.isActive
    //             ? "text-green-700 bg-green-300 rounded-xl p-1"
    //             : "text-red-700 bg-red-300 rounded-xl p-1"
    //         }`}
    //       >
    //         {row.original.isActive ? "Yes" : "No"}
    //       </span>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row, getValue }) => {
    //     const currentStatus = getValue();
    //     return (
    //       <select
    //         value={currentStatus as string}
    //         onChange={(e) =>
    //           handleStatusChange(
    //             e.target.value as TOrderStatus,
    //             row?.original?._id as string
    //           )
    //         }
    //         className={`
    //             px-3 py-1 rounded-xl text-sm font-medium
    //             ${
    //               currentStatus === "Cancelled" ? "bg-red-100 text-red-700" : ""
    //             }
    //             ${
    //               currentStatus === "Delivered"
    //                 ? "bg-blue-100 text-blue-700"
    //                 : ""
    //             }
    //             ${
    //               currentStatus === "Confirmed"
    //                 ? "bg-green-100 text-green-700"
    //                 : ""
    //             }
    //             ${
    //               currentStatus === "Pending"
    //                 ? "bg-yellow-100 text-yellow-700"
    //                 : ""
    //             }
    //             focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500
    //           `}
    //       >
    //         {orderStatus.map((status) => (
    //           <option key={status} value={status}>
    //             {status}
    //           </option>
    //         ))}
    //       </select>
    //     );
    //   },
    // },
    // {
    //   header: "Delete",
    //   cell: ({ row }) => (
    //     <div>
    //       <button
    //         // onClick={() => handleDelete(row?.original?._id as string)}
    //         className="px-2 py-1 bg-red-500 text-white rounded font-inter cursor-pointer"
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
    {
      header: "Details",
      cell: ({ row }) => (
        <div>
          <Link
            href={`/meals/${row?.original?._id}`}
            className="px-2 py-1 bg-blue-500 text-white rounded font-inter"
          >
            Details
          </Link>
        </div>
      ),
    },
  ];
  return (
    <>
      {!(result as TMealFormData[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            No Meals Available Right Now
          </h1>
          <Link
            href="/mealProvider/addMeal"
            className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300"
          >
            Add Meal
          </Link>
        </div>
      )}
      <div className="mt-10 container mx-auto p-4 font-inter">
        {isModalOpen && (
          <div
            onClick={closeModal}
            className="fixed inset-0 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this car?
              </h3>
              {/* {errorMessage && (
            <h1 className="text-red-600 text-sm text-center mb-4">
              {errorMessage}
            </h1>
          )} */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  //   onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mb-6 px-4 py-6 bg-white rounded-xl shadow-md border border-gray-200 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-2 tracking-tight">
            My Meals
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 font-medium">
            Total Meals:{" "}
            <span className="text-blue-500 font-semibold">
              {result?.length}
            </span>
          </p>
        </div>
        <Table data={result} columns={columns} />
        <Pagination totalPage={meta?.totalPage} />
      </div>
    </>
  );
};

export default MyMealsComponent;
