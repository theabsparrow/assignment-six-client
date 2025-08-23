export type TGender = "Male" | "Female" | "Other";

export type TAlergies =
  | "Egg"
  | "Nuts"
  | "Milk"
  | "Gluten"
  | "Shellfish"
  | "Soy"
  | "Wheat"
  | "Fish"
  | "Sesame"
  | "Peanuts"
  | "Dairy"
  | "None";

export type TCustomerRegistrationData = {
  user: {
    email: string;
    phone: string;
    password: string;
  };
  customer: {
    name: string;
    profileImage?: string;
    address: string;
    allergies?: TAlergies[];
    gender: TGender;
    dateOfBirth: string;
  };
};

export type FormValuesCustomer = {
  email: string;
  phone: string;
  password: string;
  name: string;
  profileImage?: string;
  address: string;
  allergies?: string[];
  gender: string;
  dateOfBirth: string;
  confirmPass: string;
};
