import NoUser from "@/components/modules/auth/forgetPassword/NoUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "No user - Daily Dish",
  description:
    "This page provides an empty user. After searching if there is no user then you are redirected to this page",
};

const NoUserPage = () => {
  return (
    <div>
      <NoUser />
    </div>
  );
};

export default NoUserPage;
