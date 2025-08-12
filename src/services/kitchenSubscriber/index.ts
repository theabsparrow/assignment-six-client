"use server";

import { config } from "@/config";
import { getValidToken } from "../authService/validToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getMyAllSubscription = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.kitchenType) {
      params.append("kitchenType", query?.kitchenType.toString());
    }
    if (query?.isActive) {
      params.append("isActive", query?.isActive.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/kitchenSubscribe/my-subscription?limit=20&${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["KitchenSubscriber"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const beASubscriber = async (id: string) => {
  const token = await getValidToken();
  console.log(id);
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchenSubscribe/addSubscriber/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("kitchen");
    revalidateTag("KitchenSubscriber");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const removeSubscription = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchenSubscribe/removeSubscriber/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("kitchen");
    revalidateTag("KitchenSubscriber");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const isKitchenSubscribed = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchenSubscribe/is-kitchenSubscribed/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["KitchenSubscriber"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
