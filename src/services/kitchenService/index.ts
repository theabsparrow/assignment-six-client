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

export const getKitchenProfile = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/kitchen-profile/${id}`,
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

export const getASingleKitchen = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/single-kitchen/${id}`,
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

export const getAllKitchen = async (query?: {
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
    if (query?.hygieneCertified) {
      params.append("hygieneCertified", query?.hygieneCertified.toString());
    }
    if (query?.isActive) {
      params.append("isActive", query?.isActive.toString());
    }
    if (query?.sort) {
      params.append("sort", query?.sort.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/all-kitchen?limit=20&${params}`,
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

export const deleteKitchen = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/delete-kitchen/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
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

export const updateStatus = async (id: string, data: { isActive: boolean }) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/kitchen/update-status/${id}`,
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
    revalidateTag("Profile");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
