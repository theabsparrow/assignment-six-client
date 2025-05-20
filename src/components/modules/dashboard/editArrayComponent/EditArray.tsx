"use client";

import { ReactNode, useEffect, useState } from "react";

type TArrayEditProps<T> = {
  value: T[];
  valueOptions: T[];
  handleSubmit: (
    field: string,
    addOptions: T[] | [],
    removeOptions: T[]
  ) => Promise<void>;
};

const EditArray = <T,>({
  value,
  valueOptions,
  handleSubmit,
}: TArrayEditProps<T>) => {
  const [editing, setEditing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<T[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [backupOptions, setBackupOptions] = useState<T[]>([]);
  const [availableOptions, setAvailableOptions] = useState<T[]>([]);

  const handleEditToggle = () => {
    if (editing && value?.length) {
      const addedItems: T[] = selectedOptions.filter(
        (item) => !value!.includes(item as T)
      );
      const removedItems: T[] = value!.filter(
        (item) => !selectedOptions.includes(item as T)
      );

      if (addedItems.length > 0 || removedItems.length > 0) {
        handleSubmit(" ", addedItems, removedItems);
      }
    } else {
      setBackupOptions([...selectedOptions]);
    }

    setEditing(!editing);
  };

  const handleRemove = (item: T) => {
    setSelectedOptions(selectedOptions.filter((a) => a !== item));
    setAvailableOptions([...availableOptions, item]);
  };

  const handleAdd = (item: T) => {
    setSelectedOptions([...selectedOptions, item]);
    setAvailableOptions(availableOptions.filter((a) => a !== item));
  };

  useEffect(() => {
    const allergies: T[] = value ?? [];
    setSelectedOptions(allergies as T[]);
    setAvailableOptions(
      valueOptions.filter((item) => !allergies.includes(item))
    );
  }, [value, valueOptions]);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-indigo-700">Allergies:</h4>
        <button
          onClick={handleEditToggle}
          className="text-sm px-3 py-1 rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition"
        >
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      {selectedOptions.length > 0 ? (
        <ul className="flex flex-wrap gap-2 mt-2">
          {selectedOptions.map((item, i) => (
            <li
              key={i}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
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

      {editing && availableOptions.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <select
            onChange={(e) => {
              const selected = e.target.value as T;
              if (selected) handleAdd(selected);
              e.target.selectedIndex = 0;
            }}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="">Select allergy to add</option>
            {availableOptions.map((item, i) => (
              <option key={i} value={item as string}>
                {item as ReactNode}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default EditArray;
