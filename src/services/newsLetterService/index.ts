"use server";

import { config } from "@/config";
import { revalidateTag } from "next/cache";

export const subscribe = async (data: { email: string }) => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriber/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    revalidateTag("subscriber");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
