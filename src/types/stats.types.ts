export type TNewUserLastWeek = { _id: number; count: number };
export type TShowCharts =
  | "user"
  | "meal"
  | "kitchen"
  | "blog"
  | "subscriber"
  | "order";

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

export type priceStats = {
  title: string;
  price: number;
};

export type TMealStats = {
  total: number;
  cuisine: {
    Bengali: number;
    IndianMeal: number;
    ChineseMeal: number;
    ContinentalMeal: number;
    ItalianMeal: number;
    ThaiMeal: number;
    AmericanMeal: number;
    MediterraneanMeal: number;
    MexicanMeal: number;
    TurkishMeal: number;
    PersianMeal: number;
    SpanishMeal: number;
    FrenchMeal: number;
    JapaneseMeal: number;
    KoreanMeal: number;
  };
  category: {
    breakFastMeal: number;
    lunchMeal: number;
    dinnerMeal: number;
    snackMeal: number;
  };
  preference: {
    mixedFood: number;
    vegFood: number;
    nonVegFood: number;
  };
  size: {
    smallSize: number;
    mediumSize: number;
    largeSize: number;
  };
  status: {
    available: number;
    notAvailable: number;
  };
  price: {
    highestPriceMeal: priceStats;
    lowestPriceMeal: priceStats;
  };
  newMealsByWeek: TNewUserLastWeek[];
};

export type TTopBlog = {
  title: string;
  view: number;
};
export type TBlogsStats = {
  total: number;
  topBlogs: TTopBlog[];
  status: {
    publishedBlog: number;
    archivedBlog: number;
  };
  newBlogsByWeek: TNewUserLastWeek[];
};

type TTopMealStats = {
  deliveredCount: number;
  mealId: {
    title: string;
  };
};
export type TOrderStats = {
  total: number;
  topOrder: TTopMealStats[];
  status: {
    OutForDelivery: number;
    cancel: number;
    confirm: number;
    cooking: number;
    delivered: number;
    pending: number;
    readyForPickup: number;
  };
  types: {
    activeOrder: number;
    cashOnDelivery: number;
    inActiveOrder: number;
    manualDelivery: number;
    onlineDelivery: number;
    planDelivery: number;
    regularOrder: number;
    singleOrder: number;
  };
  newBlogsByWeek: TNewUserLastWeek[];
};
