"use server";

import { config } from "@/config";
import { getValidToken } from "../authService/validToken";
import { FeedbackFormData } from "@/types/rating.types";
import { revalidateTag } from "next/cache";

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
    revalidateTag("Ratings");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
