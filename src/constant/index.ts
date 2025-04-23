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

export const navItems = [
  { name: "Profile", href: "/profile", icon: "👤" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];
export const mealProviderItems = [
  { name: "My Kitchen", href: "/mealProvider/myKitchen", icon: "👩‍🍳" },
  { name: "Add Meal", href: "/mealProvider/addMeal", icon: "➕" },
  { name: "My Meals", href: "/mealProvider/myMeals", icon: "🍛" },
  { name: "My Orders", href: "/mealProvider/myOrders", icon: "📦" },
];
export const customerItems = [
  {
    name: "My Plans",
    href: "/user/my-plans",
    icon: "📊",
  },
  {
    name: "Create Plan",
    href: "/user/create-plan",
    icon: "📝",
  },
  {
    name: "My Orders",
    href: "/user/my-orders",
    icon: "🛒",
  },
];
