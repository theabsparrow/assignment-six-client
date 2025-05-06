"use server";

import { config } from "@/config";

import { TMealPlanner } from "@/types/MealPlanType";
import { revalidateTag } from "next/cache";
import { getValidToken } from "../authService/validToken";

export const createMealPlan = async (MealPlanner: TMealPlanner) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/mealPlanner/create-mealPlanner`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(MealPlanner),
      }
    );
    const result = await res.json();
    revalidateTag("MealPlan");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyPlans = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/mealPlanner/get-myPlans`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["MealPlan"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
