"use server";

import { config } from "@/config";
import { TSettingsInfo, TUpdatedUserData } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getValidToken } from "../authService/validToken";

export const getMyProfle = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(`${config.next_public_base_api}/user/my-profile`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Profile"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateCustomerProfile = async (
  updatedData: Partial<TUpdatedUserData>
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/customer/update-info`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    revalidateTag("Profile");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMealProviderProfile = async (
  updatedData: Partial<TUpdatedUserData>
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/meal-provider/updateInfo`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    revalidateTag("Profile");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updatePhoneEmail = async (info: Partial<TSettingsInfo>) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/user/update-info`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    revalidateTag("Profile");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const verifyEmail = async (data: { otp: string }) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/user/verify-email`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag("Profile");
    const result = await res.json();
    if (result?.success) {
      (await cookies()).delete("refresh1Token");
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const skipVerification = async () => {
  (await cookies()).delete("refresh1Token");
};

export const deleteMyAccount = async (data: { password: string }) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/user/delete/my-account`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    if (result?.success) {
      (await cookies()).delete("refreshToken");
      (await cookies()).delete("accessToken");
      (await cookies()).delete("refresh1Token");
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
