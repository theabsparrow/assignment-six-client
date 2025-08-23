"use server";

import { config } from "@/config";
import { TConfirmModal, TOrder } from "@/types/orderTypes";
import { revalidateTag } from "next/cache";
import { getValidToken } from "../authService/validToken";
import { cookies } from "next/headers";

export const createOrder = async (orderInfo: TConfirmModal, id: string) => {
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

export const getMyOrders = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.deliveryMode) {
      params.append("deliveryMode", query?.deliveryMode.toString());
    }
    if (query?.orderType) {
      params.append("orderType", query?.orderType.toString());
    }
    if (query?.payment) {
      params.append("payment", query?.payment.toString());
    }
    if (query?.status) {
      params.append("status", query?.status.toString());
    }
    if (query?.isActive) {
      params.append("isActive", query?.isActive.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/order/myOrders?limit=20&${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["myOrder"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateOrderStatus = async (id: string, data: Partial<TOrder>) => {
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
        body: JSON.stringify(data),
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

export const deleteOrder = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/order/delete-order/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
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
