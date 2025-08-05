"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getValidToken } from "../authService/validToken";
import { TSubscriber } from "@/types/subscriber.types";

export const getAllSubscribers = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.status) {
      params.append("status", query?.status.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/subscriber/?limit=20&${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["subscriber"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const subscribe = async (data: { email: string }) => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriber/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    revalidateTag("subscriber");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const changeStatus = async (data: Partial<TSubscriber>, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriber/change-status/${id}`,
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
    revalidateTag("subscriber");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteSubscriber = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriber/delete-subscriber/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("subscriber");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
