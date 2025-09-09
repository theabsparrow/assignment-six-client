"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import ProfileDropdown from "./ProfileDropDown";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/authService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import {
  icons,
  navbarLinkWithoutUser,
  navLinkForMobileForUser,
  navLinks,
} from "@/constant/navbar.const";
import Flag from "react-world-flags";
import NotificationComponent from "./NotificationComponent";

type TNavbarProps = {
  name?: string;
  profileImage?: string;
  id?: string | null;
};

const Navbar = ({ name, profileImage, id }: TNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    setIsLoading(true);
    router.push("/login");
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("searchTerm", searchTerm.toString());
    router.push(`/meals?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <section className="hidden bg-[#111111] px-24 py-2 font-inter md:flex items-center justify-between text-white ">
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
      <nav className="bg-gray-200 dark:bg-gray-900 shadow-xl sticky top-0 w-full z-50 transition duration-300 md:px-24 px-5 py-3 font-inter border">
        <div className="flex justify-between items-center ">
          {/* Logo */}
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
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
                    ? "bg-secondary border border-primary text-gray-900"
                    : "hover:bg-secondary hover:border hover:border-primary hover:text-gray-900 duration-300"
                }`}
              >
                Kitchen
              </Link>
            )}
          </div>
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="search for meals"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none border rounded-l-lg px-4 py-1 w-44"
            />
            <button
              onClick={handleSearch}
              disabled={searchTerm === ""}
              className=" bg-secondary text-primary border border-primary rounded-r-lg px-2 py-1 font-bold cursor-pointer disabled:bg-green-200 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
          {id && (
            <div className="hidden md:flex">
              <NotificationComponent id={id} />
            </div>
          )}
          {/* dropdown */}
          <div className="hidden md:flex items-center gap-6">
            <ProfileDropdown name={name} profileImage={profileImage} />
            <DarkModeToggle />
          </div>

          {/* Mobile responsive */}
          {id && (
            <div className="md:hidden">
              <NotificationComponent id={id} />
            </div>
          )}
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
          <div className="md:hidden bg-gray-200 dark:bg-gray-900 py-2 absolute top-14 right-0 shadow-2xl  border-t-2 border-t-primary w-56 rounded-b-md z-20">
            {name && (
              <p className="flex items-center justify-between text-gray-700 dark:text-gray-200 p-2 border-b border-b-gray-400  transition  ">
                <span className=" font-semibold text-primary dark:text-secondary">
                  {name}
                </span>
                <Link href="/profile">
                  <Image
                    src={profileImage as string}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover w-10 h-10 rounded-full overflow-hidden"
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
