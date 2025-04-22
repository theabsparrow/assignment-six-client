export const protectedRoute = [
  "/profile",
  "/settings",
  "/kitchen",
  "/admin",
  "/admin/:page",
  "/user",
  "/user/:page",
  "/mealProvider",
  "/mealProvider/:page",
];

export const USER_ROLE = {
  admin: "admin",
  customer: "customer",
  superAdmin: "superAdmin",
  mealProvider: "mealProvider",
} as const;
