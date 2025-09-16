import SelectOption from "@/components/modules/auth/selectOption/SelectOption";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Daily Dish",
  description:
    "Regester with a role of porovider or customer. Give all the requested info to successfully finish your registration",
};
const Register = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <SelectOption />
    </div>
  );
};

export default Register;
