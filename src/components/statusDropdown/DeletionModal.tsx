"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

type tDelationModalProps = {
  name: string;
  collection: string;
  handleDelete: (
    setLoading: Dispatch<SetStateAction<boolean>>,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
};

const DeletionModal = ({
  name,
  collection,
  handleDelete,
}: tDelationModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div className="border border-red-400 px-6 md:px-10 py-6 rounded-md bg-white dark:bg-gray-950 shadow-sm">
      <div className="flex flex-col md:flex-row items-center md:justify-between space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-red-700 flex items-center gap-2">
          <FaTrashAlt className="text-red-600" />
          Account Deletion
        </h3>
        <button
          onClick={() => setOpen(true)}
          className="text-sm md:text-base text-red-600 hover:text-red-800 underline cursor-pointer"
        >
          Delete Account
        </button>
      </div>

      {open && (
        <div>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Confirm Deletion
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to remove <strong>{name}</strong> <br />{" "}
                from your {collection} list? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-300 transition cursor-pointer disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(setLoading, setOpen)}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition cursor-pointer disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Removing..." : "Yes, Remove"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletionModal;
