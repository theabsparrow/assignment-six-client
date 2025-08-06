import { TAlergies, TGender } from "./customerRegistration";
import { TStatus } from "./subscriber.types";

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
  verifiedWithEmail: boolean;
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
  email: string;
  phone: string;
  verifiedWithEmail: boolean;
  password: string;
};

export type TCommonProfile = {
  _id: string;
  dateOfBirth: string;
  gender: TGender;
  name: string;
  address: string;
  hasKitchen?: boolean;
};

export type TUserListingType = {
  _id: string;
  email: string;
  phone: string;
  role: TUSerRole;
  status: TStatus;
  verifiedWithEmail: boolean;
  profile: TCommonProfile;
};
