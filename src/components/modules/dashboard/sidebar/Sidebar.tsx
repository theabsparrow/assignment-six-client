"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import {
  adminItems,
  customerItems,
  mealProviderItems,
  navItems,
  USER_ROLE,
} from "@/constant";
import { LogOut } from "lucide-react";
import { logout } from "@/services/authService";

const Sidebar = ({ role }: { role: string }) => {
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
        <aside className="sticky top-0 z-10 w-64 bg-gray-300 text-white transform h-screen flex flex-col justify-between pb-6">
          <div className="px-8 py-4 ">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={200}
                height={200}
                className="w-[10vw]"
              />
            </Link>
          </div>

          <nav className=" px-4">
            <h1 className="px-4 text-primary font-bold">MENU</h1>
            <div className="flex flex-col gap-2">
              {role === USER_ROLE.mealProvider &&
                mealProviderItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-800 hover:bg-primary hover:text-white hover:shadow"
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
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-800 hover:bg-primary hover:text-white hover:shadow"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              {(role === USER_ROLE.admin || role === USER_ROLE.superAdmin) &&
                adminItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-800 hover:bg-primary hover:text-white hover:shadow"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
            </div>
          </nav>

          <nav className=" px-4 ">
            <h1 className="px-4 text-primary font-bold">GENERAL</h1>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-800 hover:bg-primary hover:text-white hover:shadow"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className=" w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-800 hover:bg-primary hover:text-white hover:shadow cursor-pointer"
              >
                <span className="text-xl">
                  <LogOut />
                </span>
                <span>Logout</span>
              </button>
            </div>
          </nav>
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
                <Image src="logo.PNG" alt="logo" width={100} height={100} />
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
              {(role === USER_ROLE.admin || role === USER_ROLE.superAdmin) &&
                adminItems.map((link) => (
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
