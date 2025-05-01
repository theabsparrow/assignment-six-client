"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "@/services/authService";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProfileDropdown = ({
  name,
  profileImage,
}: {
  name?: string;
  profileImage?: string;
}) => {
  const { setIsLoading, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
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
  const handleLogout = async () => {
    await logout();
    setOpen(false);
    setIsLoading(true);
    router.push("/login");
    setUser(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Image Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer"
      >
        {profileImage ? (
          <Image
            src={profileImage}
            alt="Profile"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        ) : (
          <FaUserCircle size={45} />
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 py-2 text-sm text-gray-700 dark:text-gray-100">
          {name ? (
            <>
              <p className="block px-4 py-3  border-b-1 border-dashed text-xl font-bold text-green-800">
                {name}
              </p>
              <div className="space-y-2  mt-2 ">
                <Link
                  href="/profile"
                  className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition "
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer "
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
