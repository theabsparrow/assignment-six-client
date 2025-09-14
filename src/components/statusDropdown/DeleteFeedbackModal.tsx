"use client";

import { deleteMyFeedback } from "@/services/feedbackService";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const DeleteFeedbackModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteMyFeedback(id);
      if (result?.success) {
        setOpen(false);
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section>
      <div
        className="absolute right-6 top-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
        onMouseEnter={(e) => e.stopPropagation()}
      >
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <MdDelete />
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
                Are you sure you want to remove this feedback ?
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
                  onClick={handleDelete}
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
    </section>
  );
};

export default DeleteFeedbackModal;
