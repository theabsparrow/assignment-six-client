"use client";

import {
  DeleteNotification,
  updateNotification,
} from "@/services/notificationService";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { BsThreeDots } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { PiDotsThreeBold } from "react-icons/pi";

const NotificationDeleteModal = ({
  id,
  onDelete,
  onMarkRead,
}: {
  id: string;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
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

  const handleReadNotification = async () => {
    try {
      const result = await updateNotification(id);
      if (result?.success) {
        onMarkRead(id);
        setOpen(false);
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDeleteNotification = async () => {
    try {
      const result = await DeleteNotification(id);
      if (result?.success) {
        onDelete(id);
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
      <div className="md:hidden " onMouseEnter={(e) => e.stopPropagation()}>
        <button
          className="cursor-pointer p-2 bg-gray-300 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <PiDotsThreeBold />
        </button>
      </div>

      {open && (
        <div className="absolute w-56 right-20 -bottom-4 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-lg py-1 px-2 z-50 space-y-1 md:space-y-2 border border-gray-400 overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReadNotification();
            }}
            className="flex items-center w-full gap-4 text-sm hover:bg-gray-200 py-1 px-2 rounded-lg cursor-pointer"
          >
            <IoMdCheckmark className="text-xl" /> Mark as unread
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNotification();
            }}
            className="flex items-center w-full gap-4 text-sm hover:bg-gray-200 py-1 px-2 cursor-pointer"
          >
            <TiDeleteOutline className="text-xl" /> Delete this notification
          </button>
        </div>
      )}
    </section>
  );
};

export default NotificationDeleteModal;
