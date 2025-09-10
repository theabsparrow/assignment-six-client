"use client";

import { config } from "@/config";
import {
  getMyNotifications,
  updateNotification,
} from "@/services/notificationService";
import { timeAgo } from "@/utills/notificationTime";
import { TNotification } from "@/types/notificationType";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

const NotificationComponent = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const fetchNotifications = async () => {
      try {
        const data = await getMyNotifications();
        const myNotifications = data?.data || [];
        setNotifications(myNotifications);
        const unread = myNotifications.filter(
          (n: TNotification) => !n.isRead
        ).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("❌ Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    if (socketRef.current) return;
    const socket: Socket = io(config.next_public_socket_api as string, {
      withCredentials: true,
    });
    socket.on("connect", () => {
      socket.emit("join", id);
    });
    socket.on("notification", (payload: TNotification) => {
      setNotifications((prev) => [payload, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });
    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
    });
    return () => {
      socket.disconnect();
    };
  }, [id]);

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

  const handleClickNotification = async (
    notificationId: string,
    link?: string
  ) => {
    try {
      const result = await updateNotification(notificationId);
      if (result?.success) {
        if (link) {
          router.push(link as string);
          setOpen(false);
        }
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          if (!open) {
            setUnreadCount(0);
          }
          setOpen(!open);
        }}
        className="relative p-2 rounded-full cursor-pointer hover:text-primary dark:hover:text-secondary duration-500"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-14 -right-24 md:-right-64 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50">
          <ul className="max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.length === 0 && (
              <li className="text-gray-500 text-sm p-4 text-center">
                No notifications
              </li>
            )}
            {notifications.map((n, i) => (
              <li
                key={i}
                onClick={() => handleClickNotification(n?._id, n?.link)}
                className={`relative flex flex-col gap-1 py-3 px-4 cursor-pointer transition-colors duration-200
            ${
              n?.isRead
                ? "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                : "bg-blue-50 dark:bg-gray-700 font-semibold hover:bg-blue-100 dark:hover:bg-gray-600"
            }`}
              >
                {!n?.isRead && (
                  <span className="absolute top-4 left-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                )}
                <span className="text-sm">{n?.content}</span>
                <span className="text-xs text-gray-500">
                  {timeAgo(n?.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default NotificationComponent;
