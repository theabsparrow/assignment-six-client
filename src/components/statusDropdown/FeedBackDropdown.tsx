"use client";

import { deleteMyFeedback } from "@/services/feedbackService";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";
import UpdateFeedbackDropdown from "./UpdateFeedbackDropdown";

type TFeedbackDropdown = {
  id: string;
  feedback: string;
  rating: number;
};

const FeedBackDropdown = ({ id, feedback, rating }: TFeedbackDropdown) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
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
    <section ref={dropdownRef}>
      <div
        className="absolute right-6 top-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
        onMouseEnter={(e) => e.stopPropagation()}
      >
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <BsThreeDots />
        </button>
      </div>

      {open && (
        <div className="absolute w-44 right-0 top-12 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-lg py-1 px-2 z-50 space-y-1 md:space-y-2 border border-gray-400 overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="flex items-center w-full gap-2 text-sm hover:bg-gray-200 py-1 px-2 rounded-lg cursor-pointer"
          >
            <MdEdit className="text-xl" /> Edit Feedack
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="flex items-center w-full gap-2 text-sm hover:bg-gray-200 py-1 px-2 cursor-pointer"
          >
            <MdDelete className="text-xl" /> Delete Feedback
          </button>
        </div>
      )}
      <UpdateFeedbackDropdown
        id={id}
        feedback={feedback}
        rating={rating}
        vlaue={isOpen}
        setValue={setIsOpen}
      />
    </section>
  );
};

export default FeedBackDropdown;
