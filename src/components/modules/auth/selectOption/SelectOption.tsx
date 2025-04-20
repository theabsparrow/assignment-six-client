"use client";
import { useState } from "react";
import RegisterCustomer from "../register/RegisterCustomer";
import RegisterMealProvider from "../register/RegisterMealProvider";
import SelectOptionComponent from "./SelectOptionComponent";

const SelectOption = () => {
  const [registeredRole, setRegisteredRole] = useState("");
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
