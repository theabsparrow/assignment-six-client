"use client";
import Image from "next/image";
import { TUSerWithEmail } from "./ForgetPass";
import { useRouter } from "next/navigation";

const ResetPassword = ({ userInfo }: { userInfo: Partial<TUSerWithEmail> }) => {
  const router = useRouter();
  // useEffect(() => {
  //   const otpPage = localStorage.getItem("forgetPass") ? true : false;
  //   if (!otpPage) {
  //     setEmailPage(true);
  //     localStorage.setItem("forgetPass", "forgetPassForm");
  //   } else {
  //     setEmailPage(otpPage);
  //   }
  // }, [setEmailPage]);

  const handleOptPage = () => {
    router.push("/reset-password");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-2">
      <div className=" bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center min-w-[50vw] min-h-[80vh] ">
        <div className="flex justify-center mb-4">
          <Image
            src={userInfo?.userInfo?.profileImage as string}
            alt="Profile"
            width={50}
            height={50}
            className="h-24 w-24 rounded-full border-2 border-indigo-500 shadow-md"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Hello, {userInfo?.userInfo?.name}
        </h2>
        <button
          onClick={handleOptPage}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-300 cursor-pointer"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
