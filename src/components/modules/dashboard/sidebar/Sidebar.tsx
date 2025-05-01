"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../../app/assets/logo.svg";
import { useUser } from "@/context/UserContext";
import {
  customerItems,
  mealProviderItems,
  navItems,
  USER_ROLE,
} from "@/constant";
import { LogOut } from "lucide-react";
import { logout } from "@/services/authService";

const Sidebar = ({
  name,
  profileImage,
  role,
}: {
  name: string;
  profileImage: string;
  role: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useUser();

  const handleLogout = async () => {
    await logout();
    setIsLoading(true);
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <>
      <div className="hidden md:flex ">
        <aside className="sticky top-0 z-10 w-64 bg-gray-300 text-white transform border-2 h-screen flex flex-col justify-between pb-6">
          <div className="flex items-center justify-between px-6 py-2 border-b-2 border-dashed border-gray-400">
            <div className="text-2xl font-bold text-gray-800 dark:text-white ">
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

          <div className="px-4 w-full space-y-2">
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-800 to-emerald-700 text-white px-4 py-3 rounded-lg shadow-md">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                {profileImage && (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">{name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className=" w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-800 hover:bg-gradient-to-r hover:from-green-800 hover:to-emerald-700 hover:text-white hover:shadow cursor-pointer"
            >
              <span className="text-xl">
                <LogOut />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </aside>
      </div>

      <div className="sticky top-0 md:hidden bg-green-500">
        <div className="absolte top-1 ">
          <button
            className="   text-gray-700 p-4 z-20"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-gray-200 dark:bg-gray-900 pt-16 pb-4 space-y-2 absolute top-0 right-1 px-6 shadow-2xl h-screen flex flex-col justify-between">
            <div className="text-2xl font-bold text-gray-800 dark:text-white flex justify-center">
              <Link href="/">
                <Image src={logo} alt="logo" width={100} height={100} />
              </Link>
            </div>

            <div className="space-y-4">
              {role === USER_ROLE.mealProvider &&
                mealProviderItems.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition
          ${
            pathname === link.href
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          }
        `}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                ))}

              {role === USER_ROLE.customer &&
                customerItems.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition
                    ${
                      pathname === link.href
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }
                  `}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                ))}
            </div>

            <div className="space-y-4">
              {navItems.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition
                  ${
                    pathname === link.href
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }
                `}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}

              <button
                className=" flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={handleLogout}
              >
                <span className="text-xl">
                  <LogOut />
                </span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
