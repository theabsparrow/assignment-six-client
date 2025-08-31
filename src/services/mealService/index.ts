"use server";

import { config } from "@/config";
import { TMealFormData, TUpdatemealData } from "@/types/mealType";
import { revalidateTag } from "next/cache";
import { getValidToken } from "../authService/validToken";
import { cookies } from "next/headers";

export type TQueryProps = { [key: string]: string | string[] | undefined };

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
  [key: string]: string | string[] | number | undefined;
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
    if (query?.minPrice) {
      params.append("minPrice", query?.minPrice.toString());
    }
    if (query?.maxPrice) {
      params.append("maxPrice", query?.maxPrice.toString());
    }
    if (query?.isAvailable) {
      params.append("isAvailable", query?.isAvailable.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    if (query?.limit) {
      params.append("limit", query?.limit.toString());
    } else {
      params.append("limit", "20");
    }
    const res = await fetch(
      `${config.next_public_base_api}/meal/get-allMeals?${params}`,
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

export const getAllMealList = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
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
    if (query?.portionSize) {
      params.append("portionSize", query?.portionSize.toString());
    }
    if (query?.isAvailable) {
      params.append("isAvailable", query?.isAvailable.toString());
    }
    if (query?.sort) {
      params.append("sort", query?.sort.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/meal/all-mealList?limit=20&${params}`,
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

export const getCheckoutMeal = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/meal/get-checkoutMeal/${id}`,
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

export const getAMealProfile = async (id: string, query?: TQueryProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/meal/get-mealProfile/${id}?${params}`,
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

export const getMyMeals = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
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
    if (query?.minPrice) {
      params.append("minPrice", query?.minPrice.toString());
    }
    if (query?.maxPrice) {
      params.append("maxPrice", query?.maxPrice.toString());
    }
    if (query?.portionSize) {
      params.append("portionSize", query?.portionSize.toString());
    }
    if (query?.isAvailable) {
      params.append("isAvailable", query?.isAvailable.toString());
    }
    if (query?.sort) {
      params.append("sort", query?.sort.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/meal/get-myMeals?limit=20&${params}`,
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

export const getMyMealDetails = async (id: string, query?: TQueryProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/meal/my-mealDetails/${id}?${params}`,
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

export const getFoodCategory = async () => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/meal/meal-category`,
      {
        next: { revalidate: 30 },
        method: "GET",
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getFoodPreference = async () => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/meal/meal-preference`,
      {
        next: { revalidate: 30 },
        method: "GET",
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCuisineType = async () => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/meal/cuisine-type`,
      {
        next: { revalidate: 30 },
        method: "GET",
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMostSearchedmeals = async () => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/meal/most-SearchedMeals`,
      {
        next: { revalidate: 30 },
        method: "GET",
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteMeal = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/meal/delete-meal/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    revalidateTag("Meals");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMeal = async (
  data: Partial<TUpdatemealData>,
  id: string
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/meal/update-meal/${id}`,
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
    revalidateTag("Meals");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
