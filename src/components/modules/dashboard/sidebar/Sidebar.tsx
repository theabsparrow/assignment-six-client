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
import { LogOut, Menu, X } from "lucide-react";
import { logout } from "@/services/authService";
import DarkModeToggle from "@/components/shared/DarkModeToggle";

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
        <aside className="sticky top-0 z-10 w-64 bg-gray-300 dark:bg-gray-800 transform min-h-screen flex flex-col justify-between py-6">
          <div className="relative w-60 h-12 px-8 ">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <nav className=" px-4">
            <h1 className="px-4 text-sm text-primary dark:text-secondary font-bold">
              MENU
            </h1>
            <div className="flex flex-col gap-1">
              {role === USER_ROLE.mealProvider &&
                mealProviderItems.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-1 rounded-lg font-medium transition-all duration-200 ${
                        active
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-800 hover:bg-primary hover:text-white hover:shadow dark:text-gray-200"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

              {role === USER_ROLE.customer &&
                customerItems.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-1 rounded-lg font-medium transition-all duration-200 ${
                        active
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-800 hover:bg-primary hover:text-white hover:shadow dark:text-gray-200"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

              {(role === USER_ROLE.admin || role === USER_ROLE.superAdmin) &&
                adminItems.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-1 rounded-lg font-medium transition-all duration-200 ${
                        active
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-800 hover:bg-primary hover:text-white hover:shadow dark:text-gray-200"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
            </div>
          </nav>

          <nav className=" px-4 ">
            <h1 className="px-4 text-sm text-primary dark:text-secondary font-bold">
              GENERAL
            </h1>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-1 rounded-lg font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-800 hover:bg-primary hover:text-white hover:shadow dark:text-gray-200"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className=" w-full flex items-center gap-3 px-4 py-1 rounded-lg font-medium transition-all duration-200 text-gray-800 hover:bg-primary hover:text-white hover:shadow cursor-pointer"
              >
                <span className="text-xl">
                  <LogOut />
                </span>
                <span>Logout</span>
              </button>
              <DarkModeToggle />
            </div>
          </nav>
        </aside>
      </div>

      <div className="flex md:hidden justify-between items-center sticky top-0 z-20  bg-gray-200 dark:bg-gray-900 shadow lg px-4">
        <div className="relative w-36 md:w-44 h-12">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>
        <div className="absolte top-1 right-0">
          <button
            className="text-2xl text-gray-700 dark:text-white p-4 z-20"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={25} />
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-gray-200 dark:bg-gray-900 space-y-2 absolute top-0 right-1 px-3 shadow-2xl h-screen flex flex-col  z-30 py-2">
            <div className="absolte -top-20">
              <button
                className="text-2xl text-gray-700 dark:text-white z-20"
                onClick={() => setIsOpen(false)}
              >
                <X size={25} />
              </button>
            </div>

            <div className="space-y-10">
              <div className="space-y-2">
                <h1 className="px-4 text-sm text-primary dark:text-secondary font-bold">
                  MENU
                </h1>
                {role === USER_ROLE.mealProvider &&
                  mealProviderItems.map((link) => {
                    const active = pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                          active
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-800 hover:bg-primary hover:text-white hover:shadow dark:text-gray-200"
                        }`}
                      >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}

                {role === USER_ROLE.customer &&
                  customerItems.map((link) => {
                    const active = pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                          active
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-800 hover:bg-primary hover:text-white hover:shadow dark:text-gray-200"
                        }`}
                      >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}

                {(role === USER_ROLE.admin || role === USER_ROLE.superAdmin) &&
                  adminItems.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-800 hover:bg-primary hover:text-white hover:shadow dark:text-gray-200"
                        }`}
                      >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
              </div>

              <div className="space-y-2">
                <h1 className="px-4 text-sm text-primary dark:text-secondary font-bold">
                  GENERAL
                </h1>
                {navItems.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-800 hover:bg-primary hover:text-white hover:shadow dark:text-gray-200"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                ))}

                <button
                  className=" w-full flex items-center gap-3 px-3 py-1 rounded-lg font-medium transition-all duration-200 text-gray-800 hover:bg-primary hover:text-white hover:shadow dark:text-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  <span className="text-xl">
                    <LogOut />
                  </span>
                  <span>Logout</span>
                </button>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
