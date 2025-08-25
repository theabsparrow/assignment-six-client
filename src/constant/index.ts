// export const protectedRoute = [
//   "/profile",
//   "/settings",
//   "/kitchen",
//   "/admin",
//   "/admin/:page",
//   "/user",
//   "/user/:page",
//   "/mealProvider",
//   "/mealProvider/:page",
// ];

export const USER_ROLE = {
  admin: "admin",
  customer: "customer",
  superAdmin: "superAdmin",
  mealProvider: "mealProvider",
} as const;

export const navItems = [
  { name: "Profile", href: "/profile", icon: "👤" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
  { name: "Home", href: "/", icon: "🏠" },
];
export const mealProviderItems = [
  { name: "My Kitchen", href: "/mealProvider/myKitchen", icon: "👩‍🍳" },
  { name: "Add Meal", href: "/mealProvider/addMeal", icon: "➕" },
  { name: "My Meals", href: "/mealProvider/myMeals", icon: "🍛" },
  { name: "My Orders", href: "/mealProvider/myOrders", icon: "📦" },
  { name: "My Blogs", href: "/myBlogs", icon: "✍️" },
  {
    name: "My Subscriptions",
    href: "/subscription",
    icon: "🔄",
  },
  {
    name: "All Meals",
    href: "/meals",
    icon: "🍽️",
  },
  {
    name: "All Kitchens",
    href: "/kitchen",
    icon: "👨‍🍳",
  },
  {
    name: "All Blogs",
    href: "/blogs",
    icon: "✍️",
  },
];
export const customerItems = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
    icon: "📊",
  },
  {
    name: "Create Plan",
    href: "/user/createPlan",
    icon: "📝",
  },
  {
    name: "My Plans",
    href: "/user/myPlans",
    icon: "📅",
  },
  {
    name: "My Orders",
    href: "/user/myOrders",
    icon: "🛒",
  },
  {
    name: "My Subscriptions",
    href: "/subscription",
    icon: "🔄",
  },
  { name: "My Blogs", href: "/myBlogs", icon: "✍️" },
  {
    name: "All Meals",
    href: "/meals",
    icon: "🍽️",
  },
  {
    name: "All Kitchens",
    href: "/kitchen",
    icon: "👨‍🍳",
  },
  {
    name: "All Blogs",
    href: "/blogs",
    icon: "✍️",
  },
];

export const adminItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "📊",
  },
  {
    name: "Manage User",
    href: "/admin/manageUsers",
    icon: "👥",
  },
  {
    name: "Subscribers",
    href: "/admin/subscribers",
    icon: "📬",
  },
  {
    name: "Manage Kitchen",
    href: "/admin/manageKitchen",
    icon: "👨‍🍳",
  },
  {
    name: "Manage Meal",
    href: "/admin/manageMeal",
    icon: "🍽️",
  },
  {
    name: "All Orders",
    href: "/admin/allOrders",
    icon: "🛒",
  },
  {
    name: "Manage Blog",
    href: "/admin/manageBlog",
    icon: "✍️",
  },
  {
    name: "My Subscriptions",
    href: "/subscription",
    icon: "🔄",
  },
  { name: "My Blogs", href: "/myBlogs", icon: "✍️" },
];
