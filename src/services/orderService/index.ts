"use server";

import { config } from "@/config";

import { TOrder, TOrderStatus } from "@/types/orderTypes";
import { revalidateTag } from "next/cache";
import { getValidToken } from "../authService/validToken";

export const createOrder = async (orderInfo: TOrder, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/order/place-order/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderInfo),
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCustomerOrder = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/order/myOrders`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["myOrder"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMealProviderOrder = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/order/mealProvider-orders`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["ProviderOrder"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

type TStatus = {
  status: TOrderStatus;
};

export const updateOrderStatus = async (status: TStatus, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/order/change-status/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      }
    );
    const result = await res.json();
    revalidateTag("myOrder");
    revalidateTag("ProviderOrder");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
