"use server";

import { config } from "@/config";
import { getValidToken } from "../authService/validToken";
import { FeedbackFormData } from "@/types/rating.types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createFeedback = async (
  ratingInfo: FeedbackFormData,
  id: string
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/rating/add-rating/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingInfo),
      }
    );
    const result = await res.json();
    revalidateTag("myOrder");
    revalidateTag("Meals");
    revalidateTag("Feedbacks");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyAllFeedbacks = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    const limit = 15;
    params.append("limit", limit.toString());
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/rating/my-feedbacks?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Feedbacks"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteMyFeedback = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/rating/remove-rating/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("myOrder");
    revalidateTag("Meals");
    revalidateTag("Feedbacks");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMyFeedback = async (
  id: string,
  payload: Partial<FeedbackFormData>
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/rating/update-feedback/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    revalidateTag("myOrder");
    revalidateTag("Meals");
    revalidateTag("Feedbacks");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllMealsOfAMeal = async (
  id: string,
  query?: {
    [key: string]: string | string[] | number | undefined;
  }
) => {
  try {
    const params = new URLSearchParams();
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/rating/all-feedback/${id}?${params}`,
      {
        method: "GET",
        next: {
          tags: ["Feedbacks"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
