"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getValidToken } from "../authService/validToken";

export const getMyNotifications = async (query?: {
  [key: string]: number | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    if (query?.limit) {
      params.append("limit", query?.limit.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/notification/my-notification?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Notification"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateNotification = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/notification/read-notification/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("Notification");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const DeleteNotification = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/notification/delete-notification/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("Notification");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
