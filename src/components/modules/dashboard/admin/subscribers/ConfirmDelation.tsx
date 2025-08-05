"use client";
import { deleteSubscriber } from "@/services/newsLetterService";
import { useState } from "react";
import { toast } from "sonner";

const ConfirmDelation = ({ id, email }: { id: string; email: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    if (!id) {
      toast.error("falid to remove subscriber", { duration: 3000 });
      setLoading(false);
      return;
    }
    const toastId = toast.loading("Removing subscriber...");
    try {
      const result = await deleteSubscriber(id);
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
    console.log(id);
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm font-medium cursor-pointer"
      >
        Remove
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove <strong>{email}</strong> <br />{" "}
              from your subscriber list? This action cannot be undone.
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
      )}
    </div>
  );
};

export default ConfirmDelation;
