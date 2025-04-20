"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Image Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 focus:outline-none"
      >
        <Image
          src="/default-avatar.jpg"
          alt="Profile"
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 py-2 text-sm text-gray-700 dark:text-gray-100">
          <Link
            href="/login"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => setOpen(false)}
          >
            Register
          </Link>
          <Link
            href="/dashboard"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
