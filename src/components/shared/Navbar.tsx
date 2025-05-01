"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import ProfileDropdown from "./ProfileDropDown";
import Image from "next/image";
import logo from "../../app/assets/logo.svg";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/authService";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({
  name,
  profileImage,
}: {
  name?: string;
  profileImage?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setIsLoading, setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
    { name: "Blogs", href: "/blogs" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsOpen(false);
    setIsLoading(true);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-200 dark:bg-gray-900 shadow-xl sticky top-0 w-full z-50 transition duration-300 md:px-16 px-5">
      <div className="flex justify-between h-16 items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <Link href="/">
            <Image src={logo} alt="logo" width={70} height={70} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link?.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={` transition font-medium ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {name && (
            <Link
              href="/kitchen"
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium ${
                pathname.startsWith("/kitchen")
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : ""
              }`}
            >
              Kitchen
            </Link>
          )}
        </div>

        {/* dropdown */}
        <div className="hidden md:flex items-center gap-6">
          <ProfileDropdown name={name} profileImage={profileImage} />
          <DarkModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-200 dark:bg-gray-900 pt-2 pb-4 space-y-2 absolute top-16 right-1 px-6 shadow-2xl rounded-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/kitchen"
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Kitchen
              </Link>
              <Link
                href="/profile"
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/settings"
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}

          <DarkModeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
