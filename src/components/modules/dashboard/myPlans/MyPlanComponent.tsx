/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Table from "@/components/table/Table";
import { TMetaDataProps } from "@/types";
import { TMyMealPlanner } from "@/types/MealPlanType";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

const MyPlanComponent = ({
  myPlanner,
}: {
  myPlanner: TMyMealPlanner[];
  meta: TMetaDataProps;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleDelete = (id: string) => {
  //   // setDeleteCarId(id);
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
    // setDeleteCarId(null);
  };

  const columns: ColumnDef<TMyMealPlanner>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "foodPreference", header: "Food preference" },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        return (
          <span
            className={`${
              row.original.isActive
                ? "text-green-700 bg-green-300 rounded-xl p-1"
                : "text-red-700 bg-red-300 rounded-xl p-1"
            }`}
          >
            {row.original.isActive ? "Active" : "Deactive"}
          </span>
        );
      },
    },
    {
      header: "Delete",
      cell: ({ row }) => (
        <div>
          <button
            // onClick={() => handleDelete(row?.original?._id as string)}
            className="px-2 py-1 bg-red-500 text-white rounded font-inter cursor-pointer"
          >
            Delete
          </button>
        </div>
      ),
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <div>
          <Link
            href={`/details/${row.original?._id}`}
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
      {!myPlanner?.length && (
        <div>
          <h1>no plan is available right now </h1>
          <Link href="/user/MyPlans">Create Plan</Link>
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
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">My Planner</h2>
          <h1 className="text-xl">Total Plans: {myPlanner?.length}</h1>
        </div>
        <Table data={myPlanner} columns={columns} />
      </div>
    </>
  );
};

export default MyPlanComponent;
