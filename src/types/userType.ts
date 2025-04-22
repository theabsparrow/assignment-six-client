export type TUSerRole = "admin" | "customer" | "superAdmin" | "meal provider";

export type TUSer = {
  exp?: number;
  iat?: number;
  userId: string;
  userRole: TUSerRole;
};
