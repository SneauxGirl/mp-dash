export type ProductName =
  | "Kettlecorn"
  | "Caramel Corn"
  | "Lemonade"
  | "Cotton Candy";

export type LocationName =
  | "Golden 1 Center"
  | "Cal Expo"
  | "Sutter Park"
  | "Downtown Plaza"
  | "UCD Stadium"
  | "Roseville Fairgrounds";

export type EventType = "Stadium" | "Festival" | "Street";

export type VendorSales = Record<ProductName, number>;
export type ProductSales = Record<ProductName, number>;

export type TopProductName =
  | "Kettlecorn"
  | "Caramel Corn"
  | "Lemonade"
  | "Cotton Candy"
  | "Flavored Lemonade"
  | "Cheese Corn";

export type ProductGrowthBasis = "mom" | "yoy";

export type ProductStatus =
  | "Great"
  | "Strong"
  | "Good"
  | "Stable"
  | "Watch"
  | "Down";

export type TopProductCatalogRecord = {
  product: TopProductName;
  type: string;
};

export type TopProductMonthlyRecord = {
  month: string;
  product: TopProductName;
  type: string;
  locationType: EventType;
  topLocation: LocationName;
  topLocationSharePct: number;
  unitsSold: number;
  revenue: number;
  growthPct: number;
  growthBasis: ProductGrowthBasis;
  status: ProductStatus;
};

export type EventRecord = {
  id: number;
  date: string;
  location: LocationName;
  type: EventType;
};

export type StadiumVendorBreakdown = {
  date: string;
  location: LocationName;
  vendors: Record<string, VendorSales>;
};

export type DailyLocationSales = {
  date: string;
  location: LocationName;
  sales: ProductSales;
};

export type MonthlyLocationSales = {
  month: string;
  locations: Record<LocationName, ProductSales>;
};

export type ExpenseGroup = {
  id: "product" | "staff" | "facilities" | "venues";
  label: string;
  meta: string;
  amount: number;
  percent: number;
  paid: number;
  upcoming: number;
  accent: "gold" | "green" | "goldDeep" | "greenSoft";
};

export type ExpenseBudgetSlice = {
  amount: number;
  paid: number;
  upcoming: number;
};

export type MonthlyTargetRecord = {
  month: string;
  target: number;
};

export type KPITrend = "up" | "down" | "neutral";

export type KPIRecord = {
  id: string;
  value: string;
  sub: string;
  trend: KPITrend;
};

export type ExpenseBreakdown = {
  product: number;
  staff: number;
  facilities: number;
  venues: number;
};

export type DailyEventFinance = {
  id: number;
  date: string;
  location: LocationName;
  type: EventType;
  revenue: ProductSales;
  expenses: ExpenseBreakdown;
  vendors?: Record<string, VendorSales>;
};

export type MonthlyExpenseRecord = {
  month: string;
  groups: Record<ExpenseGroup["id"], ExpenseBudgetSlice>;
};

export type RevenueChannelRecord = {
  month: string;
  events: number;
  retail: number;
  stands: number;
  online: number;
};

/* --------------------------
   HELPERS
-------------------------- */

const ENDINGS = [13, 27, 34, 41, 58, 63, 79, 86] as const;

function stampAmount(value: number, salt: number) {
  const base = Math.round(value / 100) * 100;
  return base + ENDINGS[salt % ENDINGS.length];
}

function stampSales(sales: ProductSales, saltStart: number): ProductSales {
  return {
    Kettlecorn: stampAmount(sales.Kettlecorn, saltStart + 0),
    "Caramel Corn": stampAmount(sales["Caramel Corn"], saltStart + 1),
    Lemonade: stampAmount(sales.Lemonade, saltStart + 2),
    "Cotton Candy": stampAmount(sales["Cotton Candy"], saltStart + 3),
  };
}

function stampLocations(
  locations: Record<LocationName, ProductSales>,
  saltStart: number
): Record<LocationName, ProductSales> {
  const orderedLocations: LocationName[] = [
    "Golden 1 Center",
    "Cal Expo",
    "Sutter Park",
    "Downtown Plaza",
    "UCD Stadium",
    "Roseville Fairgrounds",
  ];

  return orderedLocations.reduce((acc, location, index) => {
    acc[location] = stampSales(locations[location], saltStart + index * 7);
    return acc;
  }, {} as Record<LocationName, ProductSales>);
}

function sumProductSales(sales: ProductSales) {
  return Object.values(sales).reduce((sum, value) => sum + value, 0);
}

function makeExpenseSlice(
  amount: number,
  paidRatio: number,
  upcomingRatio: number
): ExpenseBudgetSlice {
  const paid = Math.round(amount * paidRatio);
  const upcoming = Math.round(amount * upcomingRatio);

  return {
    amount,
    paid,
    upcoming,
  };
}

function rollupJuneLocations(
  entries: DailyEventFinance[]
): Record<LocationName, ProductSales> {
  const emptySales = (): ProductSales => ({
    Kettlecorn: 0,
    "Caramel Corn": 0,
    Lemonade: 0,
    "Cotton Candy": 0,
  });

  const rolled: Record<LocationName, ProductSales> = {
    "Golden 1 Center": emptySales(),
    "Cal Expo": emptySales(),
    "Sutter Park": emptySales(),
    "Downtown Plaza": emptySales(),
    "UCD Stadium": emptySales(),
    "Roseville Fairgrounds": emptySales(),
  };

  entries.forEach((entry) => {
    rolled[entry.location].Kettlecorn += entry.revenue.Kettlecorn;
    rolled[entry.location]["Caramel Corn"] += entry.revenue["Caramel Corn"];
    rolled[entry.location].Lemonade += entry.revenue.Lemonade;
    rolled[entry.location]["Cotton Candy"] += entry.revenue["Cotton Candy"];
  });

  return rolled;
}

function buildDailyLocationSales(entries: DailyEventFinance[]): DailyLocationSales[] {
  return entries.map((entry) => ({
    date: entry.date,
    location: entry.location,
    sales: entry.revenue,
  }));
}

function buildStadiumVendorBreakdown(
  entries: DailyEventFinance[]
): StadiumVendorBreakdown[] {
  return entries
    .filter((entry) => entry.vendors)
    .map((entry) => ({
      date: entry.date,
      location: entry.location,
      vendors: entry.vendors!,
    }));
}

function buildExpenseGroups(monthlyExpenses: MonthlyExpenseRecord[]): ExpenseGroup[] {
  const totals = monthlyExpenses.reduce(
    (acc, month) => {
      acc.product.amount += month.groups.product.amount;
      acc.product.paid += month.groups.product.paid;
      acc.product.upcoming += month.groups.product.upcoming;

      acc.staff.amount += month.groups.staff.amount;
      acc.staff.paid += month.groups.staff.paid;
      acc.staff.upcoming += month.groups.staff.upcoming;

      acc.facilities.amount += month.groups.facilities.amount;
      acc.facilities.paid += month.groups.facilities.paid;
      acc.facilities.upcoming += month.groups.facilities.upcoming;

      acc.venues.amount += month.groups.venues.amount;
      acc.venues.paid += month.groups.venues.paid;
      acc.venues.upcoming += month.groups.venues.upcoming;

      return acc;
    },
    {
      product: { amount: 0, paid: 0, upcoming: 0 },
      staff: { amount: 0, paid: 0, upcoming: 0 },
      facilities: { amount: 0, paid: 0, upcoming: 0 },
      venues: { amount: 0, paid: 0, upcoming: 0 },
    }
  );

  const totalTracked =
    totals.product.amount +
    totals.staff.amount +
    totals.facilities.amount +
    totals.venues.amount;

  return [
    {
      id: "product",
      label: "Product",
      meta: "Inventory, food, supplies",
      amount: totals.product.amount,
      percent: Math.round((totals.product.amount / totalTracked) * 100),
      paid: totals.product.paid,
      upcoming: totals.product.upcoming,
      accent: "gold",
    },
    {
      id: "staff",
      label: "Staff",
      meta: "Payroll, taxes, support",
      amount: totals.staff.amount,
      percent: Math.round((totals.staff.amount / totalTracked) * 100),
      paid: totals.staff.paid,
      upcoming: totals.staff.upcoming,
      accent: "green",
    },
    {
      id: "facilities",
      label: "Facilities / Equip",
      meta: "Kitchen, storage, equipment, upkeep",
      amount: totals.facilities.amount,
      percent: Math.round((totals.facilities.amount / totalTracked) * 100),
      paid: totals.facilities.paid,
      upcoming: totals.facilities.upcoming,
      accent: "goldDeep",
    },
    {
      id: "venues",
      label: "Venues",
      meta: "Venue fees, permits, event access",
      amount: totals.venues.amount,
      percent: Math.round((totals.venues.amount / totalTracked) * 100),
      paid: totals.venues.paid,
      upcoming: totals.venues.upcoming,
      accent: "greenSoft",
    },
  ];
}

/* --------------------------
   CANONICAL JUNE EVENT DATA
-------------------------- */

const juneEventFinancials: DailyEventFinance[] = [
  {
    id: 1,
    date: "2025-06-01",
    location: "Golden 1 Center",
    type: "Stadium",
    revenue: {
      Kettlecorn: 1647,
      "Caramel Corn": 1719,
      Lemonade: 1538,
      "Cotton Candy": 1186,
    },
    expenses: {
      product: 913,
      staff: 1207,
      facilities: 341,
      venues: 968,
    },
    vendors: {
      "F. Weasley": {
        Kettlecorn: 612,
        "Caramel Corn": 651,
        Lemonade: 588,
        "Cotton Candy": 453,
      },
      "N. Uzumaki": {
        Kettlecorn: 551,
        "Caramel Corn": 574,
        Lemonade: 497,
        "Cotton Candy": 385,
      },
      "Stand 1": {
        Kettlecorn: 484,
        "Caramel Corn": 494,
        Lemonade: 453,
        "Cotton Candy": 348,
      },
    },
  },
  {
    id: 2,
    date: "2025-06-01",
    location: "Downtown Plaza",
    type: "Street",
    revenue: {
      Kettlecorn: 681,
      "Caramel Corn": 593,
      Lemonade: 742,
      "Cotton Candy": 561,
    },
    expenses: {
      product: 347,
      staff: 688,
      facilities: 171,
      venues: 253,
    },
  },
  {
    id: 3,
    date: "2025-06-02",
    location: "Cal Expo",
    type: "Festival",
    revenue: {
      Kettlecorn: 917,
      "Caramel Corn": 1048,
      Lemonade: 972,
      "Cotton Candy": 764,
    },
    expenses: {
      product: 463,
      staff: 821,
      facilities: 246,
      venues: 407,
    },
  },
  {
    id: 4,
    date: "2025-06-02",
    location: "UCD Stadium",
    type: "Stadium",
    revenue: {
      Kettlecorn: 846,
      "Caramel Corn": 978,
      Lemonade: 904,
      "Cotton Candy": 717,
    },
    expenses: {
      product: 427,
      staff: 754,
      facilities: 214,
      venues: 382,
    },
    vendors: {
      "A. Bridgers": {
        Kettlecorn: 331,
        "Caramel Corn": 387,
        Lemonade: 354,
        "Cotton Candy": 283,
      },
      "M. Elric": {
        Kettlecorn: 279,
        "Caramel Corn": 316,
        Lemonade: 297,
        "Cotton Candy": 229,
      },
      "Stand 2": {
        Kettlecorn: 236,
        "Caramel Corn": 275,
        Lemonade: 253,
        "Cotton Candy": 205,
      },
    },
  },
  {
    id: 5,
    date: "2025-06-03",
    location: "Golden 1 Center",
    type: "Stadium",
    revenue: {
      Kettlecorn: 1894,
      "Caramel Corn": 2017,
      Lemonade: 1673,
      "Cotton Candy": 1236,
    },
    expenses: {
      product: 1018,
      staff: 1286,
      facilities: 352,
      venues: 977,
    },
    vendors: {
      "F. Weasley": {
        Kettlecorn: 713,
        "Caramel Corn": 764,
        Lemonade: 628,
        "Cotton Candy": 467,
      },
      "N. Uzumaki": {
        Kettlecorn: 644,
        "Caramel Corn": 681,
        Lemonade: 569,
        "Cotton Candy": 417,
      },
      "Stand 1": {
        Kettlecorn: 537,
        "Caramel Corn": 572,
        Lemonade: 476,
        "Cotton Candy": 352,
      },
    },
  },
  {
    id: 6,
    date: "2025-06-04",
    location: "Sutter Park",
    type: "Stadium",
    revenue: {
      Kettlecorn: 1218,
      "Caramel Corn": 1314,
      Lemonade: 1189,
      "Cotton Candy": 942,
    },
    expenses: {
      product: 604,
      staff: 918,
      facilities: 258,
      venues: 438,
    },
    vendors: {
      "J. Valentine": {
        Kettlecorn: 462,
        "Caramel Corn": 503,
        Lemonade: 451,
        "Cotton Candy": 361,
      },
      "P. Parker": {
        Kettlecorn: 401,
        "Caramel Corn": 428,
        Lemonade: 389,
        "Cotton Candy": 304,
      },
      "Stand 3": {
        Kettlecorn: 355,
        "Caramel Corn": 383,
        Lemonade: 349,
        "Cotton Candy": 277,
      },
    },
  },
  {
    id: 7,
    date: "2025-06-04",
    location: "Roseville Fairgrounds",
    type: "Festival",
    revenue: {
      Kettlecorn: 741,
      "Caramel Corn": 807,
      Lemonade: 766,
      "Cotton Candy": 593,
    },
    expenses: {
      product: 352,
      staff: 629,
      facilities: 183,
      venues: 298,
    },
  },
  {
    id: 8,
    date: "2025-06-05",
    location: "Downtown Plaza",
    type: "Street",
    revenue: {
      Kettlecorn: 534,
      "Caramel Corn": 607,
      Lemonade: 644,
      "Cotton Candy": 491,
    },
    expenses: {
      product: 273,
      staff: 537,
      facilities: 163,
      venues: 207,
    },
  },
  {
    id: 9,
    date: "2025-06-06",
    location: "Golden 1 Center",
    type: "Stadium",
    revenue: {
      Kettlecorn: 1176,
      "Caramel Corn": 1234,
      Lemonade: 1108,
      "Cotton Candy": 914,
    },
    expenses: {
      product: 601,
      staff: 903,
      facilities: 247,
      venues: 431,
    },
    vendors: {
      "F. Weasley": {
        Kettlecorn: 447,
        "Caramel Corn": 469,
        Lemonade: 421,
        "Cotton Candy": 347,
      },
      "N. Uzumaki": {
        Kettlecorn: 389,
        "Caramel Corn": 408,
        Lemonade: 366,
        "Cotton Candy": 301,
      },
      "Stand 1": {
        Kettlecorn: 340,
        "Caramel Corn": 357,
        Lemonade: 321,
        "Cotton Candy": 266,
      },
    },
  },
  {
    id: 10,
    date: "2025-06-06",
    location: "Cal Expo",
    type: "Festival",
    revenue: {
      Kettlecorn: 842,
      "Caramel Corn": 936,
      Lemonade: 871,
      "Cotton Candy": 668,
    },
    expenses: {
      product: 421,
      staff: 693,
      facilities: 207,
      venues: 319,
    },
  },
  {
    id: 11,
    date: "2025-06-07",
    location: "UCD Stadium",
    type: "Stadium",
    revenue: {
      Kettlecorn: 1007,
      "Caramel Corn": 1138,
      Lemonade: 1042,
      "Cotton Candy": 826,
    },
    expenses: {
      product: 496,
      staff: 801,
      facilities: 228,
      venues: 367,
    },
    vendors: {
      "A. Bridgers": {
        Kettlecorn: 392,
        "Caramel Corn": 446,
        Lemonade: 402,
        "Cotton Candy": 319,
      },
      "M. Elric": {
        Kettlecorn: 334,
        "Caramel Corn": 372,
        Lemonade: 343,
        "Cotton Candy": 271,
      },
      "Stand 2": {
        Kettlecorn: 281,
        "Caramel Corn": 320,
        Lemonade: 297,
        "Cotton Candy": 236,
      },
    },
  },
  {
    id: 12,
    date: "2025-06-07",
    location: "Roseville Fairgrounds",
    type: "Festival",
    revenue: {
      Kettlecorn: 566,
      "Caramel Corn": 629,
      Lemonade: 603,
      "Cotton Candy": 487,
    },
    expenses: {
      product: 287,
      staff: 518,
      facilities: 159,
      venues: 223,
    },
  },
  {
    id: 13,
    date: "2025-06-08",
    location: "Golden 1 Center",
    type: "Stadium",
    revenue: {
      Kettlecorn: 1493,
      "Caramel Corn": 1587,
      Lemonade: 1416,
      "Cotton Candy": 1109,
    },
    expenses: {
      product: 781,
      staff: 1118,
      facilities: 314,
      venues: 672,
    },
    vendors: {
      "F. Weasley": {
        Kettlecorn: 563,
        "Caramel Corn": 603,
        Lemonade: 534,
        "Cotton Candy": 419,
      },
      "N. Uzumaki": {
        Kettlecorn: 509,
        "Caramel Corn": 538,
        Lemonade: 484,
        "Cotton Candy": 378,
      },
      "Stand 1": {
        Kettlecorn: 421,
        "Caramel Corn": 446,
        Lemonade: 398,
        "Cotton Candy": 312,
      },
    },
  },
];

/* --------------------------
   MONTHLY REVENUE AGGREGATES
-------------------------- */

const monthlyJanToMayBase: MonthlyLocationSales[] = [
  {
    month: "Jan",
    locations: {
      "Golden 1 Center": {
        Kettlecorn: 24000,
        "Caramel Corn": 21100,
        Lemonade: 16100,
        "Cotton Candy": 12100,
      },
      "Cal Expo": {
        Kettlecorn: 18100,
        "Caramel Corn": 15100,
        Lemonade: 12100,
        "Cotton Candy": 9100,
      },
      "Sutter Park": {
        Kettlecorn: 15100,
        "Caramel Corn": 13100,
        Lemonade: 11100,
        "Cotton Candy": 8100,
      },
      "Downtown Plaza": {
        Kettlecorn: 10100,
        "Caramel Corn": 8600,
        Lemonade: 9100,
        "Cotton Candy": 6100,
      },
      "UCD Stadium": {
        Kettlecorn: 12100,
        "Caramel Corn": 10600,
        Lemonade: 10100,
        "Cotton Candy": 7100,
      },
      "Roseville Fairgrounds": {
        Kettlecorn: 8100,
        "Caramel Corn": 7100,
        Lemonade: 6100,
        "Cotton Candy": 5100,
      },
    },
  },
  {
    month: "Feb",
    locations: {
      "Golden 1 Center": {
        Kettlecorn: 21100,
        "Caramel Corn": 19100,
        Lemonade: 15100,
        "Cotton Candy": 11100,
      },
      "Cal Expo": {
        Kettlecorn: 16100,
        "Caramel Corn": 14100,
        Lemonade: 11100,
        "Cotton Candy": 8100,
      },
      "Sutter Park": {
        Kettlecorn: 14100,
        "Caramel Corn": 12100,
        Lemonade: 10100,
        "Cotton Candy": 7100,
      },
      "Downtown Plaza": {
        Kettlecorn: 9100,
        "Caramel Corn": 7600,
        Lemonade: 8100,
        "Cotton Candy": 5100,
      },
      "UCD Stadium": {
        Kettlecorn: 11100,
        "Caramel Corn": 9600,
        Lemonade: 9100,
        "Cotton Candy": 6100,
      },
      "Roseville Fairgrounds": {
        Kettlecorn: 7100,
        "Caramel Corn": 6100,
        Lemonade: 5100,
        "Cotton Candy": 4100,
      },
    },
  },
  {
    month: "Mar",
    locations: {
      "Golden 1 Center": {
        Kettlecorn: 29100,
        "Caramel Corn": 27100,
        Lemonade: 20100,
        "Cotton Candy": 15100,
      },
      "Cal Expo": {
        Kettlecorn: 23100,
        "Caramel Corn": 21100,
        Lemonade: 16100,
        "Cotton Candy": 12100,
      },
      "Sutter Park": {
        Kettlecorn: 19100,
        "Caramel Corn": 17100,
        Lemonade: 14100,
        "Cotton Candy": 10100,
      },
      "Downtown Plaza": {
        Kettlecorn: 13100,
        "Caramel Corn": 12100,
        Lemonade: 12100,
        "Cotton Candy": 8100,
      },
      "UCD Stadium": {
        Kettlecorn: 17100,
        "Caramel Corn": 15600,
        Lemonade: 15100,
        "Cotton Candy": 10100,
      },
      "Roseville Fairgrounds": {
        Kettlecorn: 11100,
        "Caramel Corn": 9600,
        Lemonade: 8100,
        "Cotton Candy": 7100,
      },
    },
  },
  {
    month: "Apr",
    locations: {
      "Golden 1 Center": {
        Kettlecorn: 33100,
        "Caramel Corn": 31100,
        Lemonade: 24100,
        "Cotton Candy": 18100,
      },
      "Cal Expo": {
        Kettlecorn: 27100,
        "Caramel Corn": 25100,
        Lemonade: 20100,
        "Cotton Candy": 15100,
      },
      "Sutter Park": {
        Kettlecorn: 23100,
        "Caramel Corn": 21100,
        Lemonade: 17100,
        "Cotton Candy": 12100,
      },
      "Downtown Plaza": {
        Kettlecorn: 17100,
        "Caramel Corn": 15100,
        Lemonade: 15100,
        "Cotton Candy": 10100,
      },
      "UCD Stadium": {
        Kettlecorn: 21100,
        "Caramel Corn": 19100,
        Lemonade: 18100,
        "Cotton Candy": 12100,
      },
      "Roseville Fairgrounds": {
        Kettlecorn: 14100,
        "Caramel Corn": 12600,
        Lemonade: 10100,
        "Cotton Candy": 8100,
      },
    },
  },
  {
    month: "May",
    locations: {
      "Golden 1 Center": {
        Kettlecorn: 39100,
        "Caramel Corn": 36600,
        Lemonade: 28100,
        "Cotton Candy": 21100,
      },
      "Cal Expo": {
        Kettlecorn: 32100,
        "Caramel Corn": 30100,
        Lemonade: 24100,
        "Cotton Candy": 18100,
      },
      "Sutter Park": {
        Kettlecorn: 28100,
        "Caramel Corn": 25600,
        Lemonade: 21100,
        "Cotton Candy": 15100,
      },
      "Downtown Plaza": {
        Kettlecorn: 21100,
        "Caramel Corn": 19100,
        Lemonade: 18100,
        "Cotton Candy": 12100,
      },
      "UCD Stadium": {
        Kettlecorn: 25100,
        "Caramel Corn": 23100,
        Lemonade: 22100,
        "Cotton Candy": 15100,
      },
      "Roseville Fairgrounds": {
        Kettlecorn: 17100,
        "Caramel Corn": 15100,
        Lemonade: 12100,
        "Cotton Candy": 10100,
      },
    },
  },
];

const ytdMonthlySales: MonthlyLocationSales[] = [
  ...monthlyJanToMayBase.map((entry, index) => ({
    month: entry.month,
    locations: stampLocations(entry.locations, index * 17),
  })),
  {
    month: "Jun",
    locations: rollupJuneLocations(juneEventFinancials),
  },
];

/* --------------------------
   MONTHLY EXPENSE AGGREGATES
-------------------------- */

const juneExpenseAmounts = juneEventFinancials.reduce(
  (acc, entry) => {
    acc.product += entry.expenses.product;
    acc.staff += entry.expenses.staff;
    acc.facilities += entry.expenses.facilities;
    acc.venues += entry.expenses.venues;
    return acc;
  },
  { product: 0, staff: 0, facilities: 0, venues: 0 }
);

const monthlyExpenseGroups: MonthlyExpenseRecord[] = [
  {
    month: "Jan",
    groups: {
      product: makeExpenseSlice(stampAmount(27800, 0), 0.71, 0.17),
      staff: makeExpenseSlice(stampAmount(24100, 1), 0.74, 0.12),
      facilities: makeExpenseSlice(stampAmount(10800, 2), 0.68, 0.18),
      venues: makeExpenseSlice(stampAmount(22600, 3), 0.72, 0.11),
    },
  },
  {
    month: "Feb",
    groups: {
      product: makeExpenseSlice(stampAmount(25200, 4), 0.7, 0.18),
      staff: makeExpenseSlice(stampAmount(22800, 5), 0.73, 0.13),
      facilities: makeExpenseSlice(stampAmount(10100, 6), 0.67, 0.19),
      venues: makeExpenseSlice(stampAmount(21200, 7), 0.71, 0.12),
    },
  },
  {
    month: "Mar",
    groups: {
      product: makeExpenseSlice(stampAmount(33400, 8), 0.72, 0.16),
      staff: makeExpenseSlice(stampAmount(28200, 9), 0.75, 0.11),
      facilities: makeExpenseSlice(stampAmount(12500, 10), 0.69, 0.17),
      venues: makeExpenseSlice(stampAmount(27100, 11), 0.73, 0.1),
    },
  },
  {
    month: "Apr",
    groups: {
      product: makeExpenseSlice(stampAmount(38500, 12), 0.73, 0.15),
      staff: makeExpenseSlice(stampAmount(31900, 13), 0.76, 0.1),
      facilities: makeExpenseSlice(stampAmount(14100, 14), 0.7, 0.16),
      venues: makeExpenseSlice(stampAmount(31400, 15), 0.74, 0.09),
    },
  },
  {
    month: "May",
    groups: {
      product: makeExpenseSlice(stampAmount(44600, 16), 0.74, 0.14),
      staff: makeExpenseSlice(stampAmount(36700, 17), 0.77, 0.09),
      facilities: makeExpenseSlice(stampAmount(15900, 18), 0.71, 0.15),
      venues: makeExpenseSlice(stampAmount(35800, 19), 0.75, 0.08),
    },
  },
  {
    month: "Jun",
    groups: {
      product: makeExpenseSlice(juneExpenseAmounts.product, 0.69, 0.2),
      staff: makeExpenseSlice(juneExpenseAmounts.staff, 0.72, 0.16),
      facilities: makeExpenseSlice(juneExpenseAmounts.facilities, 0.66, 0.21),
      venues: makeExpenseSlice(juneExpenseAmounts.venues, 0.7, 0.18),
    },
  },
];

/* --------------------------
   REVENUE CHANNELS
-------------------------- */

const revenueByMonth: RevenueChannelRecord[] = [
  { month: "Jan", events: 118158, retail: 46427, stands: 28413, online: 43486 },
  { month: "Feb", events: 121627, retail: 44263, stands: 46941, online: 32819 },
  { month: "Mar", events: 142279, retail: 31458, stands: 5432, online: 33827 },
  { month: "Apr", events: 152541, retail: 53586, stands: 60819, online: 24538 },
  { month: "May", events: 163286, retail: 45372, stands: 62958, online: 19143 },
  { month: "Jun", events: 32841, retail: 15928, stands: 12374, online: 15397 },
  { month: "Jul", events: 0, retail: 0, stands: 0, online: 0 },
  { month: "Aug", events: 0, retail: 0, stands: 0, online: 0 },
  { month: "Sep", events: 0, retail: 0, stands: 0, online: 0 },
  { month: "Oct", events: 0, retail: 0, stands: 0, online: 0 },
  { month: "Nov", events: 0, retail: 0, stands: 0, online: 0 },
  { month: "Dec", events: 0, retail: 0, stands: 0, online: 0 },
];

/* --------------------------
   TOP PRODUCTS
-------------------------- */

const topProductCatalog: TopProductCatalogRecord[] = [
  { product: "Kettlecorn", type: "Food / Retail" },
  { product: "Caramel Corn", type: "Food / Festival" },
  { product: "Lemonade", type: "Beverage / Stadium" },
  { product: "Cotton Candy", type: "Snack / Festival" },
  { product: "Flavored Lemonade", type: "Beverage / Street" },
  { product: "Cheese Corn", type: "Food / Stadium" },
];

const topProductMonthly: TopProductMonthlyRecord[] = [
  {
    month: "Jan",
    product: "Kettlecorn",
    type: "Food / Retail",
    locationType: "Festival",
    topLocation: "Cal Expo",
    topLocationSharePct: 41,
    unitsSold: 3847,
    revenue: 31247,
    growthPct: 12,
    growthBasis: "yoy",
    status: "Great",
  },
  {
    month: "Jan",
    product: "Caramel Corn",
    type: "Food / Festival",
    locationType: "Festival",
    topLocation: "Cal Expo",
    topLocationSharePct: 39,
    unitsSold: 3179,
    revenue: 28316,
    growthPct: -4,
    growthBasis: "yoy",
    status: "Good",
  },
  {
    month: "Jan",
    product: "Lemonade",
    type: "Beverage / Stadium",
    locationType: "Stadium",
    topLocation: "UCD Stadium",
    topLocationSharePct: 37,
    unitsSold: 3743,
    revenue: 24583,
    growthPct: 18,
    growthBasis: "yoy",
    status: "Strong",
  },
  {
    month: "Jan",
    product: "Cotton Candy",
    type: "Snack / Festival",
    locationType: "Festival",
    topLocation: "Roseville Fairgrounds",
    topLocationSharePct: 42,
    unitsSold: 3297,
    revenue: 19472,
    growthPct: 6,
    growthBasis: "yoy",
    status: "Stable",
  },
  {
    month: "Jan",
    product: "Flavored Lemonade",
    type: "Beverage / Street",
    locationType: "Street",
    topLocation: "Downtown Plaza",
    topLocationSharePct: 44,
    unitsSold: 2358,
    revenue: 17638,
    growthPct: 22,
    growthBasis: "yoy",
    status: "Strong",
  },
  {
    month: "Jan",
    product: "Cheese Corn",
    type: "Food / Stadium",
    locationType: "Stadium",
    topLocation: "Sutter Park",
    topLocationSharePct: 37,
    unitsSold: 2134,
    revenue: 17486,
    growthPct: 9,
    growthBasis: "yoy",
    status: "Good",
  },

  {
    month: "Feb",
    product: "Kettlecorn",
    type: "Food / Retail",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 42,
    unitsSold: 3814,
    revenue: 30918,
    growthPct: -1,
    growthBasis: "mom",
    status: "Great",
  },
  {
    month: "Feb",
    product: "Caramel Corn",
    type: "Food / Festival",
    locationType: "Festival",
    topLocation: "Cal Expo",
    topLocationSharePct: 40,
    unitsSold: 3091,
    revenue: 27584,
    growthPct: -3,
    growthBasis: "mom",
    status: "Good",
  },
  {
    month: "Feb",
    product: "Lemonade",
    type: "Beverage / Stadium",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 39,
    unitsSold: 3837,
    revenue: 25347,
    growthPct: 3,
    growthBasis: "mom",
    status: "Strong",
  },
  {
    month: "Feb",
    product: "Cotton Candy",
    type: "Snack / Festival",
    locationType: "Festival",
    topLocation: "Roseville Fairgrounds",
    topLocationSharePct: 43,
    unitsSold: 3216,
    revenue: 18961,
    growthPct: -3,
    growthBasis: "mom",
    status: "Stable",
  },
  {
    month: "Feb",
    product: "Flavored Lemonade",
    type: "Beverage / Street",
    locationType: "Street",
    topLocation: "Downtown Plaza",
    topLocationSharePct: 43,
    unitsSold: 2678,
    revenue: 20412,
    growthPct: 16,
    growthBasis: "mom",
    status: "Strong",
  },
  {
    month: "Feb",
    product: "Cheese Corn",
    type: "Food / Stadium",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 36,
    unitsSold: 2528,
    revenue: 20964,
    growthPct: 20,
    growthBasis: "mom",
    status: "Great",
  },

  {
    month: "Mar",
    product: "Kettlecorn",
    type: "Food / Retail",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 43,
    unitsSold: 3391,
    revenue: 27463,
    growthPct: -11,
    growthBasis: "mom",
    status: "Good",
  },
  {
    month: "Mar",
    product: "Caramel Corn",
    type: "Food / Festival",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 41,
    unitsSold: 2816,
    revenue: 24928,
    growthPct: -10,
    growthBasis: "mom",
    status: "Stable",
  },
  {
    month: "Mar",
    product: "Lemonade",
    type: "Beverage / Stadium",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 40,
    unitsSold: 3492,
    revenue: 23517,
    growthPct: -7,
    growthBasis: "mom",
    status: "Good",
  },
  {
    month: "Mar",
    product: "Cotton Candy",
    type: "Snack / Festival",
    locationType: "Festival",
    topLocation: "Cal Expo",
    topLocationSharePct: 41,
    unitsSold: 2734,
    revenue: 16384,
    growthPct: -14,
    growthBasis: "mom",
    status: "Watch",
  },
  {
    month: "Mar",
    product: "Flavored Lemonade",
    type: "Beverage / Street",
    locationType: "Festival",
    topLocation: "Cal Expo",
    topLocationSharePct: 39,
    unitsSold: 2289,
    revenue: 17096,
    growthPct: -16,
    growthBasis: "mom",
    status: "Watch",
  },
  {
    month: "Mar",
    product: "Cheese Corn",
    type: "Food / Stadium",
    locationType: "Stadium",
    topLocation: "Sutter Park",
    topLocationSharePct: 38,
    unitsSold: 2038,
    revenue: 16970,
    growthPct: -19,
    growthBasis: "mom",
    status: "Watch",
  },

  {
    month: "Apr",
    product: "Kettlecorn",
    type: "Food / Retail",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 44,
    unitsSold: 4552,
    revenue: 36874,
    growthPct: 34,
    growthBasis: "mom",
    status: "Great",
  },
  {
    month: "Apr",
    product: "Caramel Corn",
    type: "Food / Festival",
    locationType: "Festival",
    topLocation: "Cal Expo",
    topLocationSharePct: 40,
    unitsSold: 3718,
    revenue: 33146,
    growthPct: 33,
    growthBasis: "mom",
    status: "Strong",
  },
  {
    month: "Apr",
    product: "Lemonade",
    type: "Beverage / Stadium",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 41,
    unitsSold: 4689,
    revenue: 31528,
    growthPct: 34,
    growthBasis: "mom",
    status: "Great",
  },
  {
    month: "Apr",
    product: "Cotton Candy",
    type: "Snack / Festival",
    locationType: "Festival",
    topLocation: "Roseville Fairgrounds",
    topLocationSharePct: 44,
    unitsSold: 3972,
    revenue: 24387,
    growthPct: 49,
    growthBasis: "mom",
    status: "Great",
  },
  {
    month: "Apr",
    product: "Flavored Lemonade",
    type: "Beverage / Street",
    locationType: "Street",
    topLocation: "Downtown Plaza",
    topLocationSharePct: 41,
    unitsSold: 3351,
    revenue: 25594,
    growthPct: 50,
    growthBasis: "mom",
    status: "Great",
  },
  {
    month: "Apr",
    product: "Cheese Corn",
    type: "Food / Stadium",
    locationType: "Stadium",
    topLocation: "Sutter Park",
    topLocationSharePct: 39,
    unitsSold: 2591,
    revenue: 21719,
    growthPct: 28,
    growthBasis: "mom",
    status: "Strong",
  },

  {
    month: "May",
    product: "Kettlecorn",
    type: "Food / Retail",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 43,
    unitsSold: 4687,
    revenue: 37962,
    growthPct: 3,
    growthBasis: "mom",
    status: "Great",
  },
  {
    month: "May",
    product: "Caramel Corn",
    type: "Food / Festival",
    locationType: "Festival",
    topLocation: "Cal Expo",
    topLocationSharePct: 39,
    unitsSold: 3669,
    revenue: 32718,
    growthPct: -1,
    growthBasis: "mom",
    status: "Good",
  },
  {
    month: "May",
    product: "Lemonade",
    type: "Beverage / Stadium",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 42,
    unitsSold: 5071,
    revenue: 34481,
    growthPct: 9,
    growthBasis: "mom",
    status: "Strong",
  },
  {
    month: "May",
    product: "Cotton Candy",
    type: "Snack / Festival",
    locationType: "Festival",
    topLocation: "Roseville Fairgrounds",
    topLocationSharePct: 43,
    unitsSold: 4183,
    revenue: 25642,
    growthPct: 5,
    growthBasis: "mom",
    status: "Strong",
  },
  {
    month: "May",
    product: "Flavored Lemonade",
    type: "Beverage / Street",
    locationType: "Street",
    topLocation: "Downtown Plaza",
    topLocationSharePct: 42,
    unitsSold: 2974,
    revenue: 22851,
    growthPct: -11,
    growthBasis: "mom",
    status: "Stable",
  },
  {
    month: "May",
    product: "Cheese Corn",
    type: "Food / Stadium",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 38,
    unitsSold: 2472,
    revenue: 20883,
    growthPct: -4,
    growthBasis: "mom",
    status: "Good",
  },

  {
    month: "Jun",
    product: "Kettlecorn",
    type: "Food / Retail",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 38,
    unitsSold: 1092,
    revenue: 9387,
    growthPct: -4,
    growthBasis: "mom",
    status: "Good",
  },
  {
    month: "Jun",
    product: "Caramel Corn",
    type: "Food / Festival",
    locationType: "Festival",
    topLocation: "Cal Expo",
    topLocationSharePct: 42,
    unitsSold: 1263,
    revenue: 10243,
    growthPct: 6,
    growthBasis: "mom",
    status: "Great",
  },
  {
    month: "Jun",
    product: "Lemonade",
    type: "Beverage / Stadium",
    locationType: "Stadium",
    topLocation: "Golden 1 Center",
    topLocationSharePct: 41,
    unitsSold: 1384,
    revenue: 8964,
    growthPct: 12,
    growthBasis: "mom",
    status: "Strong",
  },
  {
    month: "Jun",
    product: "Cotton Candy",
    type: "Snack / Festival",
    locationType: "Festival",
    topLocation: "Roseville Fairgrounds",
    topLocationSharePct: 37,
    unitsSold: 596,
    revenue: 4931,
    growthPct: 5,
    growthBasis: "mom",
    status: "Down",
  },
  {
    month: "Jun",
    product: "Flavored Lemonade",
    type: "Beverage / Street",
    locationType: "Street",
    topLocation: "Downtown Plaza",
    topLocationSharePct: 44,
    unitsSold: 741,
    revenue: 5618,
    growthPct: 15,
    growthBasis: "mom",
    status: "Strong",
  },
  {
    month: "Jun",
    product: "Cheese Corn",
    type: "Food / Stadium",
    locationType: "Stadium",
    topLocation: "Sutter Park",
    topLocationSharePct: 42,
    unitsSold: 1128,
    revenue: 6742,
    growthPct: -7,
    growthBasis: "mom",
    status: "Good",
  },
];

/* --------------------------
   EXPORTED DATA
-------------------------- */

export const dashboardData = {
  currentMonth: {
    month: "Jun",
    year: 2025,
    daysInMonth: 30,
  },

  tickerItems: [
    "F. Weasley shift updated for Golden 1",
    "Deliver 320 bags caramel to Cal Expo",
    "UCD lemonade restock delayed 18 min",
    "Confirm freezer inventory after close",
  ],

  products: [
    "Kettlecorn",
    "Caramel Corn",
    "Lemonade",
    "Cotton Candy",
  ] as ProductName[],

  locations: [
    "Golden 1 Center",
    "Cal Expo",
    "Sutter Park",
    "Downtown Plaza",
    "UCD Stadium",
    "Roseville Fairgrounds",
  ] as LocationName[],

  completedEvents: juneEventFinancials.map(({ id, date, location, type }) => ({
    id,
    date,
    location,
    type,
  })) as EventRecord[],

  upcomingEvents: [
    { id: 14, date: "2025-06-09", location: "Golden 1 Center", type: "Stadium" },
    { id: 15, date: "2025-06-10", location: "Cal Expo", type: "Festival" },
    { id: 16, date: "2025-06-11", location: "Downtown Plaza", type: "Street" },
    { id: 17, date: "2025-06-12", location: "UCD Stadium", type: "Stadium" },
    { id: 18, date: "2025-06-13", location: "Roseville Fairgrounds", type: "Festival" },
    { id: 19, date: "2025-06-14", location: "Golden 1 Center", type: "Stadium" },
    { id: 20, date: "2025-06-15", location: "Sutter Park", type: "Stadium" },
    { id: 21, date: "2025-06-16", location: "Downtown Plaza", type: "Street" },
  ] as EventRecord[],

  juneEventFinancials,

  ytdMonthlySales,

  dailyCurrentMonthSales: buildDailyLocationSales(juneEventFinancials),

  stadiumVendorBreakdown: buildStadiumVendorBreakdown(juneEventFinancials),

  monthlyExpenseGroups,

  expenseGroups: buildExpenseGroups(monthlyExpenseGroups),

  monthlyTargets: [
    { month: "Jan", target: 168000 },
    { month: "Feb", target: 144000 },
    { month: "Mar", target: 255000 },
    { month: "Apr", target: 247000 },
    { month: "May", target: 183000 },
    { month: "Jun", target: 285000 },
  ] as MonthlyTargetRecord[],

  kpis: [
    { id: "projected-ytd", value: "$2.70M", sub: "+$18K vs plan", trend: "up" },
    { id: "top-venue", value: "Golden 1 Center", sub: "Still pacing strongest YTD", trend: "up" },
    { id: "revenue-per-event", value: "$5,071", sub: "+3.8% vs last month", trend: "up" },
    { id: "next-7-days", value: "8 Events", sub: "6 locations active", trend: "up" },
    { id: "underperformer", value: "Cotton Candy", sub: "-4.7% vs last month", trend: "down" },
    { id: "margin", value: "12.9%", sub: "-0.8% vs target", trend: "down" },
    { id: "labor-rate", value: "28%", sub: "Within 28–30% target", trend: "neutral" },
    { id: "cost-overrun", value: "Venues", sub: "+3.9% above forecast", trend: "down" },
  ] as KPIRecord[],

  revenueByMonth,

  topProductCatalog,

  topProductMonthly,
} as const;