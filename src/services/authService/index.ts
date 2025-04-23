"use server";

import { config } from "@/config";
import { TCustomerRegistrationData } from "@/types/customerRegistration";
import { TLogin } from "@/types/loginTypes";
import { TMealproviderRegistrationData } from "@/types/mealProviderRegistration";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const registerCustomer = async (
  customerData: TCustomerRegistrationData
) => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/user/register-customer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const registerMealprovider = async (
  mealProviderdata: TMealproviderRegistrationData
) => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/user/register-mealProvider`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealProviderdata),
      }
    );
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (loginData: TLogin) => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const result = await res.json();
    console.log(result);
    if (result?.success) {
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const refreshToken = (await cookies()).get("refreshToken")!.value;
  let decodedData = null;
  if (refreshToken) {
    decodedData = await jwtDecode(refreshToken);
    return decodedData;
  } else {
    return null;
  }
};

export const reCaptchaTokenVerification = async (token: string) => {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: config.next_public_recaptcha_server_key as string,
        response: token,
      }),
    });
    return res.json();
  } catch (error: any) {
    Error(error);
  }
};

export const logout = async () => {
  (await cookies()).delete("refreshToken");
  // (await cookies()).delete("refreshToken");
  // await fetch(`${config.next_public_base_api}/auth/logout`, {
  //   method: "POST",
  //   credentials: "include",
  // });
};

export const getNewToken = async () => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/get-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("refreshToken")!.value,
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
