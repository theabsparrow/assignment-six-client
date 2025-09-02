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

export const getMealStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/statistics/meal-stats`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Meals"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getBlogStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/statistics/blog-stats`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Blogs"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getOrderStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/statistics/order-stats`,
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
