import { TAlergies, TGender } from "./customerRegistration";
import { TStatus } from "./subscriber.types";

export type TUSerRole = "admin" | "customer" | "superAdmin" | "mealProvider";

export type TUSer = {
  exp?: number;
  iat?: number;
  userId: string;
  userRole: TUSerRole;
};

export type TUserProfile = {
  name: string;
  profileImage?: string;
  dateOfBirth: string;
  gender: TGender;
  address: string;
  allergies?: TAlergies[];
  bio?: string;
  hasKitchen?: boolean;
  experienceYears?: number;
  user: {
    _id: string;
    email: string;
    phone: string;
    verifiedWithEmail: boolean;
    role: TUSerRole;
  };
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

export type TUserProfileData = {
  _id: string;
  createdAt: string;
  email: string;
  phone: string;
  role: TUSerRole;
  status: TStatus;
  verifiedWithEmail: boolean;
};

export type TuserProfile = {
  _id: string;
  address: string;
  allergies?: TAlergies[];
  bio?: string;
  hasKitchen?: boolean;
  experienceYears?: number;
  dateOfBirth: string;
  gender: TGender;
  name: string;
  profileImage: string;
  user: TUserProfileData;
};

export type TUserPayload = {
  name: string;
  profileImage?: string;
  address: string;
  allergies?: TAlergies[];
  gender: TGender;
  dateOfBirth: string;
};
