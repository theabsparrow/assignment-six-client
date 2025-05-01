"use server";

import { config } from "@/config";
import { getValidToken } from "@/lib/verifyToken";
import { TUpdatedUserData } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getMyProfle = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(`${config.next_public_base_api}/user/my-profile`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Profile"],
      },
    });
    return res.json();
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
