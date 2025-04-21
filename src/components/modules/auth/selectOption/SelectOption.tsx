"use client";
import { useEffect, useState } from "react";
import RegisterCustomer from "../register/RegisterCustomer";
import RegisterMealProvider from "../register/RegisterMealProvider";
import SelectOptionComponent from "./SelectOptionComponent";

const SelectOption = () => {
  const [registeredRole, setRegisteredRole] = useState<string | null>(null);

  useEffect(() => {
    const customer = localStorage.getItem("customerForm");
    const mealProvider = localStorage.getItem("mealProviderForm");

    if (customer) {
      setRegisteredRole("customer");
    } else if (mealProvider) {
      setRegisteredRole("mealProvider");
    } else {
      setRegisteredRole("");
    }
  }, []);

  if (registeredRole === null) return null;

  return (
    <>
      {" "}
      {registeredRole === "customer" ? (
        <RegisterCustomer setRegisteredRole={setRegisteredRole} />
      ) : registeredRole === "mealProvider" ? (
        <RegisterMealProvider setRegisteredRole={setRegisteredRole} />
      ) : (
        <SelectOptionComponent setRegisteredRole={setRegisteredRole} />
      )}
    </>
  );
};

export default SelectOption;
