import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Metadata } from "next";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Login - Daily Dish",
  description:
    "This is a loggin page. Access to your registered account with proper email and passowrd",
};
const Login = () => {
  return (
    <section className=" h-screen bg-[url('/login-banner.webp')] bg-cover bg-center bg-no-repeat bg-gray-200 dark:bg-gray-900 px-5 md:px-20 py-5 md:py-10 relative">
      <div className="absolute inset-0 bg-black/80  z-10 " />
      <div className="hidden lg:flex absolute z-20 w-[95%] lg:w-[80%] h-[90%] bg-white dark:bg-gray-800 top-[2%] lg:top-[5%] left-[3%] lg:left-[11%] bg-[url('/login-banner1.webp')] bg-cover bg-center bg-no-repeat px-10 py-4">
        <div className="space-y-4">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 text-primary dark:text-green-600 font-Inter md:text-lg font-medium hover:underline duration-500"
          >
            <FaHome /> Back to home
          </Link>
          <h2 className="text-xl md:text-4xl font-bold text-primary dark:text-green-600 font-playfair">
            Login you account
          </h2>
          <LoginForm />
        </div>
      </div>
      <div className="lg:hidden absolute z-20 space-y-4 bg-gray-200 dark:bg-gray-700 p-6 rounded-lg top-[15%] w-full left-[1%]">
        <Link
          href="/"
          className="cursor-pointer flex items-center gap-1 text-primary dark:text-green-600 font-Inter md:text-lg font-medium hover:underline duration-500"
        >
          <FaHome /> Back to home
        </Link>
        <h2 className="text-xl md:text-4xl font-bold text-primary dark:text-green-600 font-playfair">
          Login you account
        </h2>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
