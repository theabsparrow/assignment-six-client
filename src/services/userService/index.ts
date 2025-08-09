"use server";

import { config } from "@/config";
import { cookies } from "next/headers";
import { getValidToken } from "../authService/validToken";
import { TStatus } from "@/types/subscriber.types";
import { revalidateTag } from "next/cache";

export const getAllUsers = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.role) {
      params.append("role", query?.role.toString());
    }
    if (query?.status) {
      params.append("status", query?.status.toString());
    }
    if (query?.gender) {
      params.append("gender", query?.gender.toString());
    }
    if (query?.verifiedWithEmail) {
      params.append("verifiedWithEmail", query?.verifiedWithEmail.toString());
    }
    if (query?.hasKitchen) {
      params.append("hasKitchen", query?.hasKitchen.toString());
    }

    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/user/get-allUsers?limit=20&${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Users"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getUserProfile = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/user/user-profile/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Users"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateStatus = async (id: string, data: { status: TStatus }) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/user/change-status/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    revalidateTag("Users");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const deleteUser = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/user/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("Users");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
