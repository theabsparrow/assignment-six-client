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
import NotificationDeleteModal from "./NotificationDeleteModal";

const NotificationComponent = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const limit = 5;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const query = { page: 1, limit };
        const data = await getMyNotifications(query);
        const myNotifications = data?.data || [];
        setNotifications((prev) =>
          page === 1 ? myNotifications : [...prev, ...myNotifications]
        );
        setPage(1);
        setHasMore(myNotifications.length === limit);
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

  useEffect(() => {
    if (!open) return;
    const handleScroll = async () => {
      if (!listRef.current || loadingMore || !hasMore) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setLoadingMore(true);
        try {
          const nextPage = page + 1;
          const query = { page: nextPage, limit };
          const data = await getMyNotifications(query);
          const newNotifications = data?.data || [];
          if (newNotifications.length > 0) {
            setNotifications((prev) => [...prev, ...newNotifications]);
            setPage(nextPage);
            setHasMore(newNotifications.length === limit);
          } else {
            setHasMore(false);
          }
        } catch (err) {
          console.error("❌ Failed to load more:", err);
        } finally {
          setLoadingMore(false);
        }
      }
    };
    const list = listRef.current;
    list?.addEventListener("scroll", handleScroll);
    return () => list?.removeEventListener("scroll", handleScroll);
  }, [open, page, loadingMore, hasMore]);

  useEffect(() => {
    if (!listRef.current) return;
    const list = listRef.current;
    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = list;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };
    list.addEventListener("wheel", handleWheel, { passive: false });
    return () => list.removeEventListener("wheel", handleWheel);
  }, [open]);

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
  console.log(notifications);
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
        <div className="absolute top-14 -right-24 lg:-right-64 w-80 lg:w-96 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 md:py-3 z-40 ">
          <ul
            ref={listRef}
            className="max-h-72 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700"
          >
            {notifications.length === 0 && (
              <li className="text-gray-500 text-sm p-4 text-center">
                No notifications
              </li>
            )}
            {notifications.map((n, i) => (
              <li
                key={i}
                onClick={() => handleClickNotification(n?._id, n?.link)}
                className={`relative group flex flex-col gap-1 px-4 py-2 cursor-pointer transition-colors duration-200
            ${
              n?.isRead
                ? "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                : "bg-blue-50 dark:bg-gray-700 font-semibold hover:bg-blue-100 dark:hover:bg-gray-600"
            }`}
              >
                <div className="hidden lg:flex">
                  <NotificationDeleteModal
                    id={n?._id}
                    onDelete={(deletedId) => {
                      setNotifications((prev) =>
                        prev.filter((notif) => notif._id !== deletedId)
                      );
                      if (!n.isRead) {
                        setUnreadCount((prev) => Math.max(prev - 1, 0));
                      }
                    }}
                    onMarkRead={(readId) => {
                      setNotifications((prev) =>
                        prev.map((notif) =>
                          notif._id === readId
                            ? { ...notif, isRead: true }
                            : notif
                        )
                      );
                      setUnreadCount((prev) => Math.max(prev - 1, 0));
                    }}
                  />
                </div>
                {!n?.isRead && (
                  <span className="absolute top-4 left-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                )}
                <span className="text-sm hidden md:block">{n?.content}</span>
                <div className="text-sm lg:hidden flex items-center gap-6">
                  <p className="flex-grow">{n?.content}</p>{" "}
                  <div>
                    <NotificationDeleteModal
                      id={n?._id}
                      onDelete={(deletedId) => {
                        setNotifications((prev) =>
                          prev.filter((notif) => notif._id !== deletedId)
                        );
                        if (!n.isRead) {
                          setUnreadCount((prev) => Math.max(prev - 1, 0));
                        }
                      }}
                      onMarkRead={(readId) => {
                        setNotifications((prev) =>
                          prev.map((notif) =>
                            notif._id === readId
                              ? { ...notif, isRead: true }
                              : notif
                          )
                        );
                        setUnreadCount((prev) => Math.max(prev - 1, 0));
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {timeAgo(n?.createdAt)}
                </span>
              </li>
            ))}
            {loadingMore && (
              <li className="text-center p-2 text-gray-500">Loading more...</li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default NotificationComponent;
