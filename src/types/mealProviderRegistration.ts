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
  };
};

export type FormValuesMealProvider = {
  email: string;
  phone: string;
  password: string;
  name: string;
  profileImage?: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  confirmPass: string;
  bio: string;
  experienceYears?: number;
};

export type TMealProviderSubmission = {
  name: string;
  profileImage?: string;
  address: string;
  gender: TGender;
  dateOfBirth: string;
  bio: string;
  experienceYears?: number;
};
