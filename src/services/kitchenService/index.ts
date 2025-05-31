"use server";

import { config } from "@/config";
import { TKitchen } from "@/types/kitchenType";
import { revalidateTag } from "next/cache";
import { getValidToken } from "../authService/validToken";
import { cookies } from "next/headers";

export const createKitchen = async (kitchenInfo: TKitchen) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/create-kitchen`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kitchenInfo),
      }
    );
    const result = await res.json();
    revalidateTag("Profile");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyKitchen = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/myKitchen`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["kitchen"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllKitchen = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/all-kitchen`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Kitchen"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateKitchen = async (data: Partial<TKitchen>) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/update-kitchen`,
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
    revalidateTag("kitchen");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteMyKitchen = async (data: { password: string }) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/delete-myKitchen`,
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
    revalidateTag("kitchen");
    revalidateTag("Profile");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
