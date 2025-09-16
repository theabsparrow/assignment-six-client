import SetNewPassword from "@/components/modules/auth/forgetPassword/SetNewPassword";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Set New Password - Daily Dish",
  description:
    "This page will provide you the service of setting new password after veryfiying with the otp.",
};

const SetPassword = () => {
  return (
    <div>
      <SetNewPassword />
    </div>
  );
};

export default SetPassword;
