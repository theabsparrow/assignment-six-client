"use server";

import { config } from "@/config";

import { TMealPlanner, TPlanUpdate } from "@/types/MealPlanType";
import { revalidateTag } from "next/cache";
import { getValidToken } from "../authService/validToken";
import { cookies } from "next/headers";

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

export const getMyPlans = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.foodPreference) {
      params.append("foodPreference", query?.foodPreference.toString());
    }
    if (query?.isActive) {
      params.append("isActive", query?.isActive.toString());
    }
    if (query?.fields) {
      params.append("fields", query?.fields.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/mealPlanner/get-myPlans?limit=10&${params}`,
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

export const getPlanDetails = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/mealPlanner/get-myPlan/${id}`,
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

export const updatePlan = async (data: Partial<TPlanUpdate>, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/mealPlanner/update-plan/${id}`,
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
    revalidateTag("MealPlan");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deletePlan = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/mealPlanner/delete-plan/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("MealPlan");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
