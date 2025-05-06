"use server";

import { config } from "@/config";
import { TMealFormData } from "@/types/mealType";
import { revalidateTag } from "next/cache";
import { getValidToken } from "../authService/validToken";

export const createMeal = async (MealInfo: TMealFormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/meal/create-meal`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(MealInfo),
    });
    const result = await res.json();
    revalidateTag("Meals");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllMeals = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.foodCategory) {
      params.append("foodCategory", query?.foodCategory.toString());
    }
    if (query?.cuisineType) {
      params.append("cuisineType", query?.cuisineType.toString());
    }
    if (query?.foodPreference) {
      params.append("foodPreference", query?.foodPreference.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    if (query?.minPrice) {
      params.append("minPrice", query?.minPrice.toString());
    }
    if (query?.maxPrice) {
      params.append("maxPrice", query?.maxPrice.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/meal/get-allMeals?limit=20&${params}`,
      {
        method: "GET",
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

export const getASingleMeal = async (id: string) => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/meal/get-meal/${id}`,
      {
        method: "GET",
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyMeals = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/meal/get-myMeals`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Meals"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
