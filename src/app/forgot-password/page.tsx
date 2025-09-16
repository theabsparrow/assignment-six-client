import ForgetPass from "@/components/modules/auth/forgetPassword/ForgetPass";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password - Daily Dish",
  description:
    "Here you can recover your password by resetting it. With your first verify your email then reset the passowrd",
};

const SearchProfile = () => {
  return (
    <div>
      <ForgetPass />
    </div>
  );
};

export default SearchProfile;
