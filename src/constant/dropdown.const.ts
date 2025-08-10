export const statusColors: Record<
  string,
  { active: string; hover: string; text: string }
> = {
  active: {
    active: "bg-green-500 text-white",
    hover: "hover:bg-green-100",
    text: "text-green-700",
  },
  blocked: {
    active: "bg-red-500 text-white",
    hover: "hover:bg-red-100",
    text: "text-red-700",
  },
  archived: {
    active: "bg-blue-500 text-white",
    hover: "hover:bg-blue-100",
    text: "text-blue-700",
  },
  published: {
    active: "bg-green-500 text-white",
    hover: "hover:bg-green-100",
    text: "text-green-700",
  },
};
