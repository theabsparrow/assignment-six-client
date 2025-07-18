"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import ProfileDropdown from "./ProfileDropDown";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/authService";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import {
  icons,
  navbarLinkWithoutUser,
  navLinkForMobileForUser,
  navLinks,
} from "@/constant/navbar.const";
import Flag from "react-world-flags";

const Navbar = ({
  name,
  profileImage,
}: {
  name?: string;
  profileImage?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLoading, setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsOpen(false);
    setIsLoading(true);
    router.push("/login");
  };

  return (
    <>
      <section className="hidden bg-[#111111] px-16 py-2 font-inter md:flex items-center justify-between text-white ">
        <div className="flex items-center gap-20">
          <p>Call Us : +8801845477161</p>
          <p className="flex items-center gap-2">
            Location : Dhaka, Bangladesh{" "}
            <Flag code="BD" style={{ width: "24px", marginLeft: "8px" }} />
          </p>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-4 text-lg ">
            {icons.map((icon, i) => (
              <Link key={i} href="/" className="hover:text-secondary">
                <icon.icon />
              </Link>
            ))}
          </div>
          {!name && (
            <div className="flex items-center gap-4  ">
              <Link className="border-x border-gray-600 px-4" href="/login">
                sign in
              </Link>
              <Link href="/register"> register</Link>
            </div>
          )}
        </div>
      </section>
      <nav className="bg-gray-200 dark:bg-gray-900 shadow-xl sticky top-0 w-full z-50 transition duration-300 md:px-16 px-5 py-2 font-inter h-[10vh] ">
        <div className="flex justify-between items-center h-[8vh] ">
          {/* Logo */}
          <Link href="/">
            <Image
              className="w-[35vw] md:w-[10vw]"
              src="/logo.png"
              alt="logo"
              width={70}
              height={70}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link?.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={` transition text-lg px-2 py-1 rounded-lg font-semibold  ${
                    isActive
                      ? "bg-secondary border border-primary text-gray-900"
                      : "hover:bg-secondary hover:border hover:border-primary hover:text-gray-900 duration-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {name && (
              <Link
                href="/kitchen"
                className={` transition text-lg px-2 py-1 rounded-lg font-semibold  ${
                  pathname.startsWith("/kitchen")
                    ? "bg-secondary border border-primary "
                    : "hover:bg-secondary hover:border hover:border-primary duration-300"
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
              className="text-primary dark:text-gray-200 focus:outline-none"
            >
              {isOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-200 dark:bg-gray-900 px-4 py-2 absolute top-20 right-5 shadow-2xl  border-t-2 border-t-primary w-[90vw] rounded-b-md">
            {name && (
              <p className="flex items-center justify-between text-gray-700 dark:text-gray-200 pb-2 border-b border-b-gray-400  transition  ">
                <span className="text-xl font-semibold text-primary dark:text-secondary">
                  {name}
                </span>
                <Link href="/profile">
                  <Image
                    src={profileImage as string}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover w-12 h-12 rounded-full overflow-hidden"
                  />
                </Link>
              </p>
            )}
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className=" text-gray-700 dark:text-gray-200 hover:bg-secondary hover:text-primary py-2 px-3 border-b border-b-gray-400  transition  text-lg font-semibold flex justify-between items-center"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                <FaArrowRightLong />
              </Link>
            ))}
            {name ? (
              <>
                {navLinkForMobileForUser.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className=" text-gray-700 dark:text-gray-200 hover:bg-secondary hover:text-primary px-3 py-2 border-b border-b-gray-400  transition text-lg font-semibold flex justify-between items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    <FaArrowRightLong />
                  </Link>
                ))}
                <div>
                  <button
                    onClick={handleLogout}
                    className=" text-gray-700 dark:text-gray-200 hover:bg-secondary hover:text-primary px-3 py-2 w-full border-b border-b-gray-400  transition text-lg font-semibold text-start flex justify-between items-center"
                  >
                    Log Out
                    <RiLogoutBoxLine />
                  </button>
                </div>
              </>
            ) : (
              <>
                {navbarLinkWithoutUser.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className=" text-gray-700 dark:text-gray-200 hover:bg-secondary hover:text-primary px-3 py-2 border-b border-b-gray-400  transition text-lg font-semibold flex justify-between items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    <FaArrowRightLong />
                  </Link>
                ))}
              </>
            )}

            <div className="flex justify-center">
              <DarkModeToggle />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
