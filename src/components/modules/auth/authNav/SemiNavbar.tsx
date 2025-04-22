"use client";

import Link from "next/link";
import logo from "../../../../app/assets/logo.svg";
import Image from "next/image";

const SemiNavbar = () => {
  return (
    <nav className="bg-gray-200 dark:bg-gray-900 shadow-xl sticky top-0 w-full z-50 transition duration-300 md:px-16 px-5">
      <div className="flex justify-between h-16 items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <Link href="/">
            <Image src={logo} alt="logo" width={70} height={70} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SemiNavbar;
