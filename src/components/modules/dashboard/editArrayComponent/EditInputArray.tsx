"use client";

import { TArrayEditProps } from "@/types/kitchenType";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

const MAX_ITEMS = 10;
const MAX_WORDS_PER_ITEM = 2;
const MAX_LETTER_PER_WORDS = 30;

const EditInputArray = <T,>({
  value,
  handleSubmit,
  label,
}: TArrayEditProps<T>) => {
  const [editing, setEditing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<T[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [backupOptions, setBackupOptions] = useState<T[]>([]);
  const [equipmentsValue, setEquipmentsValue] = useState<string>("");

  useEffect(() => {
    const options: T[] = value ?? [];
    setSelectedOptions(options as T[]);
  }, [value]);

  const handleEditToggle = () => {
    if (editing && value?.length) {
      const addedItems: T[] = selectedOptions.filter(
        (item) => !value!.includes(item as T)
      );
      const removedItems: T[] = value!.filter(
        (item) => !selectedOptions.includes(item as T)
      );
      if (addedItems.length > 0 || removedItems.length > 0) {
        handleSubmit(label, addedItems, removedItems);
      }
    } else {
      setBackupOptions([...selectedOptions]);
    }
    setEditing(!editing);
  };

  const handleRemove = (item: T) => {
    setSelectedOptions(selectedOptions.filter((a) => a !== item));
  };

  const handleCancel = () => {
    const options: T[] = value ?? [];
    setSelectedOptions(options as T[]);
    setEquipmentsValue("");
    setEditing(false);
  };

  const handleSubmitElement = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = equipmentsValue.split(",").map((item) => item.trim());
    for (const item of items) {
      const wordCount = item.split(/\s+/).length;
      const letterCount = item.split("").length;
      if (letterCount > MAX_LETTER_PER_WORDS) {
        toast.error(
          `${item} is too big. it should not be more than ${MAX_LETTER_PER_WORDS} character.`
        );
        return;
      }
      if (wordCount > MAX_WORDS_PER_ITEM) {
        toast.error(
          `Each item should be no more than ${MAX_WORDS_PER_ITEM} words. "${item}" has ${wordCount}.`
        );
        return;
      }
    }
    if (items.length > MAX_ITEMS) {
      toast.error(`You can only enter up to ${MAX_ITEMS} equipment items.`, {
        duration: 3000,
      });
      return;
    }
    setSelectedOptions([...selectedOptions, items as T]);
    setEquipmentsValue("");
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col justify-start items-start">
        <h4 className="text-lg font-semibold text-indigo-700">{label}:</h4>
        <div className="flex items-center gap-3">
          <button
            onClick={handleEditToggle}
            className="text-sm px-3 py-1 rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition"
          >
            {editing ? "Done" : "Edit"}
          </button>
          {editing && (
            <button
              onClick={handleCancel}
              className="text-sm px-3 py-1 rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {selectedOptions.length > 0 ? (
        <ul className="flex flex-wrap gap-2 mt-2">
          {selectedOptions.map((item, i) => (
            <li
              key={i}
              className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {item as ReactNode}
              {editing && (
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

      {editing && (
        <form onSubmit={handleSubmitElement} className="mt-4">
          <div className="flex items-center  gap-2">
            <input
              type="text"
              name="equipments"
              value={equipmentsValue}
              onChange={(e) => setEquipmentsValue(e.target.value)}
              placeholder="e.g. Oven, Mixer, Blender"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm placeholder-gray-400"
            />
            {equipmentsValue && (
              <button type="submit" className=" text-blue-500 cursor-pointer">
                Add
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Max 10 items at a time. Separate items with commas ( , )
          </p>
        </form>
      )}
    </div>
  );
};

export default EditInputArray;
