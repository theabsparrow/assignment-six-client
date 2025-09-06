"use client";

import { useState } from "react";
import EditComponent from "../../editComponent/EditComponent";
import { TOrder } from "@/types/orderTypes";
import { toast } from "sonner";
import { updateOrderStatus } from "@/services/orderService";

const NoteEditingComponent = ({
  noteInfo,
  id,
}: {
  noteInfo: string;
  id: string;
}) => {
  const [isNoteEditing, setIsNoteEditing] = useState(false);
  const [note, setrNote] = useState(noteInfo ?? "");

  const handleSubmit = async (field: string) => {
    const data: Partial<TOrder> = {};
    if (field === "note") {
      if (note === noteInfo) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        data.note = noteInfo;
      }
    }
    const toastId = toast.loading("updating order info...");
    try {
      const result = await updateOrderStatus(id, data);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setIsNoteEditing(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      {isNoteEditing ? (
        <div>
          <textarea
            value={note}
            onChange={(e) => setrNote(e.target.value)}
            minLength={10}
            maxLength={200}
            className={`w-66 h-24 resize-none outline-none rounded-lg border p-2 mt-1 focus:outline-none focus:ring-2
      ${
        note.length > 0 && note.length < 10
          ? "border-red-500 focus:ring-red-500"
          : "dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-secondary"
      }`}
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum 10 characters, maximum 200 characters.
          </p>

          {note.length > 0 && note.length < 10 && (
            <p className="text-xs text-red-500 mt-1">
              ❌ Please enter at least 10 characters.
            </p>
          )}
        </div>
      ) : (
        <div className="font-semibold w-full">
          <p className="font-bold">Note:</p>
          <p>{note}</p>
        </div>
      )}
      <EditComponent
        setValue={setrNote}
        isEditing={isNoteEditing}
        setIsEditing={setIsNoteEditing}
        value={noteInfo as string}
        handleSubmit={handleSubmit}
        field="note"
      />
    </div>
  );
};

export default NoteEditingComponent;
