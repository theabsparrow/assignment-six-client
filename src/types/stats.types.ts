export type TNewUserLastWeek = { _id: number; count: number };

export type TUserStats = {
  totals: {
    totalUsers: number;
    totalAdmins: number;
    totalCustomers: number;
    totalMealProviders: number;
  };
  status: {
    activeUsers: number;
    blockedUsers: number;
  };
  verification: {
    verifiedUsers: number;
    unverifiedUsers: number;
  };
  providerKitchen: {
    providerHasKitchen: number;
    providerHasNoKitchen: number;
  };
  newUsersByWeek: TNewUserLastWeek[];
};

export type TSubscribe = {
  totals: {
    totalSubscriber: number;
    totalActive: number;
    totalBlocked: number;
  };
  newUsersByWeek: TNewUserLastWeek[];
};

export type TKitchen = {
  totals: {
    totalKitchen: number;
    homeKitchen: number;
    commercialKitchen: number;
  };
  hygieneStatus: {
    hygiene: number;
    notHygiene: number;
  };
  status: {
    active: number;
    notActive: number;
  };
};

export type TShowCharts =
  | "user"
  | "meal"
  | "kitchen"
  | "blog"
  | "subscriber"
  | "order";
