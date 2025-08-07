import { config } from "@/config";
import { cookies } from "next/headers";

export const getUSerStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/statistics/user-stats`,
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

export const getSubscriberStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/statistics/subscriber-stats`,
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

export const getKitchenStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/statistics/kitchen-stats`,
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
