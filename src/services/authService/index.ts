"use server";

import { config } from "@/config";
import { TCustomerRegistrationData } from "@/types/customerRegistration";
import { TLogin } from "@/types/loginTypes";
import { TMealproviderRegistrationData } from "@/types/mealProviderRegistration";

export const registerCustomer = async (
  customerData: TCustomerRegistrationData
) => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/user/register-customer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const registerMealprovider = async (
  mealProviderdata: TMealproviderRegistrationData
) => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/user/register-mealProvider`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealProviderdata),
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (loginData: TLogin) => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
