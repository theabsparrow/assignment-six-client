// components/Navbar.jsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import ProfileDropdown from "./ProfileDropDown";
import Image from "next/image";
import logo from "../../app/assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
    { name: "Blogs", href: "/blogs" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/kitchens"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Kitchen
          </Link>
        </div>

        {/* dropdown */}
        <div className="hidden md:flex items-center gap-6">
          <ProfileDropdown />
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
          <Link
            href="/login"
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/dashboard"
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
          <Link
            href="/kitchens"
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Kitchen
          </Link>
          <Link
            href="/register"
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
          <DarkModeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
