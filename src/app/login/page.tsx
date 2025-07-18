import LoginForm from "@/components/modules/auth/login/LoginForm";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const Login = () => {
  return (
    <section className=" h-screen bg-[url('/login-banner.webp')] bg-cover bg-center bg-no-repeat bg-gray-200 dark:bg-gray-900 px-5 md:px-20 py-5 md:py-10 relative">
      <div className="absolute inset-0 bg-black/80  z-10 " />
      <div>
        <Link
          href="/"
          className="cursor-pointer flex items-center gap-1 text-secondary font-Inter md:text-lg font-medium hover:underline duration-500"
        >
          <FaHome /> Back to home
        </Link>
        <h2 className="text-2xl md:text-6xl font-bold my-6 text-primary font-playfair">
          Welcome to Daily Dish
        </h2>
        <LoginForm />
      </div>
      <div className="absolute z-20 w-[95%] md:w-[80%] h-[90%] bg-white dark:bg-gray-800 top-[2%] md:top-[5%] left-[3%] md:left-[10%] bg-[url('/login-banner.webp')] bg-cover bg-center bg-no-repeat p-3 md:p-10">
        <div>
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 text-primary dark:text-green-600 font-Inter md:text-lg font-medium hover:underline duration-500"
          >
            <FaHome /> Back to home
          </Link>
          <h2 className="text-2xl md:text-5xl font-bold my-2 text-primary dark:text-green-600 font-playfair">
            Welcome to Daily Dish
          </h2>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
