"use server";

import { config } from "@/config";
import { TKitchen } from "@/types/kitchenType";
import { revalidateTag } from "next/cache";
import { getValidToken } from "../authService/validToken";

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
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/myKitchen`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Profile"],
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
  const token = await getValidToken();
  try {
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
