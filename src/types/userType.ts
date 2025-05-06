import { TAlergies, TGender } from "./customerRegistration";

export type TUSerRole = "admin" | "customer" | "superAdmin" | "mealProvider";

export type TUSer = {
  exp?: number;
  iat?: number;
  userId: string;
  userRole: TUSerRole;
};

export type TUserInfo = {
  email: string;
  phone: string;
  password: string;
  role: TUSerRole;
};

export type TUserData = {
  name: string;
  bio: string;
  profileImage: string;
  gender: TGender;
  dateOfBirth: string;
  address: string;
  hasKitchen: boolean;
  experienceYears: number;
  isCertified: boolean;
  licenseDocument: string;
  allergies: TAlergies[];
};

export type TUpdatedUserData = {
  experienceYears: number;
  isCertified: boolean;
  licenseDocument: string;
  addAllergies: TAlergies[];
  removeAllergies: TAlergies[];
  profileImage: string;
  bio: string;
  address: string;
  name: string;
  dateOfBirth: string;
};

export type TSettingsInfo = {
  email?: string;
  phone?: string;
};
