import { TGender } from "./customerRegistration";

export type TMealproviderRegistrationData = {
  user: {
    email: string;
    phone: string;
    password: string;
  };
  mealProvider: {
    name: string;
    profileImage?: string;
    address: string;
    gender: TGender;
    dateOfBirth: string;
    bio: string;
    experienceYears?: number;
    isCertified: boolean;
    licenseDocument?: string;
  };
};
