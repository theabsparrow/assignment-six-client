"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../../app/assets/logo.svg";
import { useUser } from "@/context/UserContext";
import { USER_ROLE } from "@/constant";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const role = user?.userRole as string;

  const navItems = [
    { name: "Profile", href: "/profile", icon: "📊" },
    { name: "Setings", href: "/settings", icon: "🛒" },
  ];
  const mealProviderItems = [
    { name: "My Kichen", href: "/mealProvider/my-kitche", icon: "📊" },
    { name: "Add Meal", href: "/mealProvider/add-meal", icon: "📊" },
    { name: "My Meals", href: "/mealProvider/my-meals", icon: "📊" },
    { name: "My Orrers", href: "/mealProvider/my-orders", icon: "📊" },
  ];
  const customerItems = [
    { name: "My Plans", href: "/user/my-plans", icon: "📊" },
    { name: "Create Plan", href: "/user/create-plan", icon: "📊" },
    { name: "My Orders", href: "/user/my-orders", icon: "📊" },
  ];

  return (
    <>
      <div className="hidden md:flex ">
        <aside className="sticky top-0 z-10 w-64 bg-gray-300 text-white transform border-2 h-screen flex flex-col justify-between py-5">
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-dashed border-gray-400">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              <Link href="/">
                <Image src={logo} alt="logo" width={200} height={200} />
              </Link>
            </div>
          </div>

          <nav className="mt-6 flex flex-col gap-2 px-4">
            {role === USER_ROLE.mealProvider &&
              mealProviderItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-md"
                      : "text-gray-800 hover:bg-gradient-to-r hover:from-green-800 hover:to-emerald-700 hover:text-white hover:shadow"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            {role === USER_ROLE.customer &&
              customerItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-md"
                      : "text-gray-800 hover:bg-gradient-to-r hover:from-green-800 hover:to-emerald-700 hover:text-white hover:shadow"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-md"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-green-800 hover:to-emerald-700 hover:text-white hover:shadow"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="px-4 w-full">
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-800 to-emerald-700 text-white px-4 py-3 rounded-lg shadow-md">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                {/* <img
        src="https://i.pravatar.cc/100"
        alt="User Avatar"
        className="w-full h-full object-cover"
      /> */}
              </div>
              <div>
                <p className="text-sm font-semibold">Bashar</p>
                <p className="text-xs text-white/80">Admin</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="relatve md:hidden">
        {isOpen && (
          <div className="md:hidden bg-gray-200 dark:bg-gray-900 pt-16 pb-4 space-y-2 absolute top-0 right-1 px-6 shadow-2xl h-screen ">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              <Link href="/">
                <Image src={logo} alt="logo" width={100} height={100} />
              </Link>
            </div>

            {navItems.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
        <button
          className="md:hidden absolute top-0 right-0 bg-green-600 text-white px-4 py-2 rounded mb-4 z-20"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰ Menu
        </button>
      </div>
    </>
  );
};

export default Sidebar;
