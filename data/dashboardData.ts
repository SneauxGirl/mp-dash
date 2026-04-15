export type ProductName =
  | "Kettlecorn"
  | "Caramel Corn"
  | "Lemonade"
  | "Cotton Candy";

export type LocationName =
  | "Golden 1 Center"
  | "Cal Expo"
  | "Sutter Health Park"
  | "Downtown Plaza"
  | "UCD Stadium"
  | "Roseville Fairgrounds";

export type EventType = "Stadium" | "Festival" | "Street";

export type VendorSales = Record<ProductName, number>;
export type ProductSales = Record<ProductName, number>;

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

export type KPITrend = "up" | "down" | "neutral";

export type KPIRecord = {
  id: string;
  value: string;
  sub: string;
  trend: KPITrend;
};

export const dashboardData = {

    tickerItems: [
    "F. Weasley shift updated for Golden 1",
    "Deliver 400 bags caramel to Cal Expo",
    "UCD lemonade restock delayed 20 min",
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
    "Sutter Health Park",
    "Downtown Plaza",
    "UCD Stadium",
    "Roseville Fairgrounds",
  ] as LocationName[],

  upcomingEvents: [
    { id: 1, date: "2025-06-01", location: "Golden 1 Center", type: "Stadium" },
    { id: 2, date: "2025-06-01", location: "Downtown Plaza", type: "Street" },
    { id: 3, date: "2025-06-02", location: "Cal Expo", type: "Festival" },
    { id: 4, date: "2025-06-02", location: "UCD Stadium", type: "Stadium" },
    { id: 5, date: "2025-06-03", location: "Golden 1 Center", type: "Stadium" },
    { id: 6, date: "2025-06-04", location: "Sutter Health Park", type: "Stadium" },
    { id: 7, date: "2025-06-04", location: "Roseville Fairgrounds", type: "Festival" },
    { id: 8, date: "2025-06-05", location: "Downtown Plaza", type: "Street" },
    { id: 9, date: "2025-06-06", location: "Golden 1 Center", type: "Stadium" },
    { id: 10, date: "2025-06-06", location: "Cal Expo", type: "Festival" },
  ] as EventRecord[],

  ytdMonthlySales: [
    {
      month: "Jan",
      locations: {
        "Golden 1 Center": {
          Kettlecorn: 24000,
          "Caramel Corn": 21000,
          Lemonade: 16000,
          "Cotton Candy": 12000,
        },
        "Cal Expo": {
          Kettlecorn: 18000,
          "Caramel Corn": 15000,
          Lemonade: 12000,
          "Cotton Candy": 9000,
        },
        "Sutter Health Park": {
          Kettlecorn: 15000,
          "Caramel Corn": 13000,
          Lemonade: 11000,
          "Cotton Candy": 8000,
        },
        "Downtown Plaza": {
          Kettlecorn: 10000,
          "Caramel Corn": 8500,
          Lemonade: 9000,
          "Cotton Candy": 6000,
        },
        "UCD Stadium": {
          Kettlecorn: 12000,
          "Caramel Corn": 10500,
          Lemonade: 10000,
          "Cotton Candy": 7000,
        },
        "Roseville Fairgrounds": {
          Kettlecorn: 8000,
          "Caramel Corn": 7000,
          Lemonade: 6000,
          "Cotton Candy": 5000,
        },
      },
    },
    {
      month: "Feb",
      locations: {
        "Golden 1 Center": {
          Kettlecorn: 21000,
          "Caramel Corn": 19000,
          Lemonade: 15000,
          "Cotton Candy": 11000,
        },
        "Cal Expo": {
          Kettlecorn: 16000,
          "Caramel Corn": 14000,
          Lemonade: 11000,
          "Cotton Candy": 8000,
        },
        "Sutter Health Park": {
          Kettlecorn: 14000,
          "Caramel Corn": 12000,
          Lemonade: 10000,
          "Cotton Candy": 7000,
        },
        "Downtown Plaza": {
          Kettlecorn: 9000,
          "Caramel Corn": 7500,
          Lemonade: 8000,
          "Cotton Candy": 5000,
        },
        "UCD Stadium": {
          Kettlecorn: 11000,
          "Caramel Corn": 9500,
          Lemonade: 9000,
          "Cotton Candy": 6000,
        },
        "Roseville Fairgrounds": {
          Kettlecorn: 7000,
          "Caramel Corn": 6000,
          Lemonade: 5000,
          "Cotton Candy": 4000,
        },
      },
    },
    {
      month: "Mar",
      locations: {
        "Golden 1 Center": {
          Kettlecorn: 29000,
          "Caramel Corn": 27000,
          Lemonade: 20000,
          "Cotton Candy": 15000,
        },
        "Cal Expo": {
          Kettlecorn: 23000,
          "Caramel Corn": 21000,
          Lemonade: 16000,
          "Cotton Candy": 12000,
        },
        "Sutter Health Park": {
          Kettlecorn: 19000,
          "Caramel Corn": 17000,
          Lemonade: 14000,
          "Cotton Candy": 10000,
        },
        "Downtown Plaza": {
          Kettlecorn: 13000,
          "Caramel Corn": 12000,
          Lemonade: 12000,
          "Cotton Candy": 8000,
        },
        "UCD Stadium": {
          Kettlecorn: 17000,
          "Caramel Corn": 15500,
          Lemonade: 15000,
          "Cotton Candy": 10000,
        },
        "Roseville Fairgrounds": {
          Kettlecorn: 11000,
          "Caramel Corn": 9500,
          Lemonade: 8000,
          "Cotton Candy": 7000,
        },
      },
    },
    {
      month: "Apr",
      locations: {
        "Golden 1 Center": {
          Kettlecorn: 33000,
          "Caramel Corn": 31000,
          Lemonade: 24000,
          "Cotton Candy": 18000,
        },
        "Cal Expo": {
          Kettlecorn: 27000,
          "Caramel Corn": 25000,
          Lemonade: 20000,
          "Cotton Candy": 15000,
        },
        "Sutter Health Park": {
          Kettlecorn: 23000,
          "Caramel Corn": 21000,
          Lemonade: 17000,
          "Cotton Candy": 12000,
        },
        "Downtown Plaza": {
          Kettlecorn: 17000,
          "Caramel Corn": 15000,
          Lemonade: 15000,
          "Cotton Candy": 10000,
        },
        "UCD Stadium": {
          Kettlecorn: 21000,
          "Caramel Corn": 19000,
          Lemonade: 18000,
          "Cotton Candy": 12000,
        },
        "Roseville Fairgrounds": {
          Kettlecorn: 14000,
          "Caramel Corn": 12500,
          Lemonade: 10000,
          "Cotton Candy": 8000,
        },
      },
    },
    {
      month: "May",
      locations: {
        "Golden 1 Center": {
          Kettlecorn: 39000,
          "Caramel Corn": 36500,
          Lemonade: 28000,
          "Cotton Candy": 21000,
        },
        "Cal Expo": {
          Kettlecorn: 32000,
          "Caramel Corn": 30000,
          Lemonade: 24000,
          "Cotton Candy": 18000,
        },
        "Sutter Health Park": {
          Kettlecorn: 28000,
          "Caramel Corn": 25500,
          Lemonade: 21000,
          "Cotton Candy": 15000,
        },
        "Downtown Plaza": {
          Kettlecorn: 21000,
          "Caramel Corn": 19000,
          Lemonade: 18000,
          "Cotton Candy": 12000,
        },
        "UCD Stadium": {
          Kettlecorn: 25000,
          "Caramel Corn": 23000,
          Lemonade: 22000,
          "Cotton Candy": 15000,
        },
        "Roseville Fairgrounds": {
          Kettlecorn: 17000,
          "Caramel Corn": 15000,
          Lemonade: 12000,
          "Cotton Candy": 10000,
        },
      },
    },
    {
      month: "Jun",
      locations: {
        "Golden 1 Center": {
          Kettlecorn: 12000,
          "Caramel Corn": 13400,
          Lemonade: 10900,
          "Cotton Candy": 7900,
        },
        "Cal Expo": {
          Kettlecorn: 6800,
          "Caramel Corn": 7600,
          Lemonade: 5800,
          "Cotton Candy": 4300,
        },
        "Sutter Health Park": {
          Kettlecorn: 6000,
          "Caramel Corn": 6600,
          Lemonade: 5700,
          "Cotton Candy": 3600,
        },
        "Downtown Plaza": {
          Kettlecorn: 2600,
          "Caramel Corn": 2300,
          Lemonade: 2400,
          "Cotton Candy": 1700,
        },
        "UCD Stadium": {
          Kettlecorn: 5000,
          "Caramel Corn": 5900,
          Lemonade: 4900,
          "Cotton Candy": 3000,
        },
        "Roseville Fairgrounds": {
          Kettlecorn: 2200,
          "Caramel Corn": 2500,
          Lemonade: 1900,
          "Cotton Candy": 1500,
        },
      },
    },
  ] as MonthlyLocationSales[],

  dailyCurrentMonthSales: [
    {
      date: "2025-06-01",
      location: "Golden 1 Center",
      sales: {
        Kettlecorn: 6900,
        "Caramel Corn": 6800,
        Lemonade: 5400,
        "Cotton Candy": 4000,
      },
    },
    {
      date: "2025-06-01",
      location: "Downtown Plaza",
      sales: {
        Kettlecorn: 1800,
        "Caramel Corn": 1400,
        Lemonade: 1600,
        "Cotton Candy": 1100,
      },
    },
    {
      date: "2025-06-02",
      location: "Cal Expo",
      sales: {
        Kettlecorn: 2200,
        "Caramel Corn": 2600,
        Lemonade: 1900,
        "Cotton Candy": 1500,
      },
    },
    {
      date: "2025-06-02",
      location: "UCD Stadium",
      sales: {
        Kettlecorn: 5100,
        "Caramel Corn": 5900,
        Lemonade: 4900,
        "Cotton Candy": 3000,
      },
    },
    {
      date: "2025-06-03",
      location: "Golden 1 Center",
      sales: {
        Kettlecorn: 7100,
        "Caramel Corn": 8000,
        Lemonade: 5800,
        "Cotton Candy": 4300,
      },
    },
    {
      date: "2025-06-04",
      location: "Sutter Health Park",
      sales: {
        Kettlecorn: 6000,
        "Caramel Corn": 6600,
        Lemonade: 5700,
        "Cotton Candy": 3600,
      },
    },
    {
      date: "2025-06-04",
      location: "Roseville Fairgrounds",
      sales: {
        Kettlecorn: 2200,
        "Caramel Corn": 2500,
        Lemonade: 1900,
        "Cotton Candy": 1500,
      },
    },
    {
      date: "2025-06-05",
      location: "Downtown Plaza",
      sales: {
        Kettlecorn: 800,
        "Caramel Corn": 900,
        Lemonade: 800,
        "Cotton Candy": 600,
      },
    },
    {
      date: "2025-06-06",
      location: "Golden 1 Center",
      sales: {
        Kettlecorn: 7900,
        "Caramel Corn": 8900,
        Lemonade: 6400,
        "Cotton Candy": 4700,
      },
    },
    {
      date: "2025-06-06",
      location: "Cal Expo",
      sales: {
        Kettlecorn: 4600,
        "Caramel Corn": 5000,
        Lemonade: 3900,
        "Cotton Candy": 2800,
      },
    },
  ] as DailyLocationSales[],

  stadiumVendorBreakdown: [
    {
      date: "2025-06-01",
      location: "Golden 1 Center",
      vendors: {
        "F. Weasley": {
          Kettlecorn: 3100,
          "Caramel Corn": 3000,
          Lemonade: 2400,
          "Cotton Candy": 1800,
        },
        "N. Uzumaki": {
          Kettlecorn: 2000,
          "Caramel Corn": 2100,
          Lemonade: 1600,
          "Cotton Candy": 1200,
        },
        "Stand 1": {
          Kettlecorn: 1800,
          "Caramel Corn": 1700,
          Lemonade: 1400,
          "Cotton Candy": 1000,
        },
      },
    },
    {
      date: "2025-06-02",
      location: "UCD Stadium",
      vendors: {
        "A. Bridgers": {
          Kettlecorn: 2200,
          "Caramel Corn": 2500,
          Lemonade: 2100,
          "Cotton Candy": 1300,
        },
        "M. Elric": {
          Kettlecorn: 1500,
          "Caramel Corn": 1800,
          Lemonade: 1500,
          "Cotton Candy": 900,
        },
        "Stand 2": {
          Kettlecorn: 1400,
          "Caramel Corn": 1600,
          Lemonade: 1300,
          "Cotton Candy": 800,
        },
      },
    },
    {
      date: "2025-06-03",
      location: "Golden 1 Center",
      vendors: {
        "F. Weasley": {
          Kettlecorn: 3200,
          "Caramel Corn": 3600,
          Lemonade: 2600,
          "Cotton Candy": 1900,
        },
        "N. Uzumaki": {
          Kettlecorn: 2100,
          "Caramel Corn": 2400,
          Lemonade: 1700,
          "Cotton Candy": 1300,
        },
        "Stand 1": {
          Kettlecorn: 1800,
          "Caramel Corn": 2000,
          Lemonade: 1500,
          "Cotton Candy": 1100,
        },
      },
    },
    {
      date: "2025-06-04",
      location: "Sutter Health Park",
      vendors: {
        "J. Valentine": {
          Kettlecorn: 2700,
          "Caramel Corn": 2600,
          Lemonade: 2500,
          "Cotton Candy": 1600,
        },
        "P. Parker": {
          Kettlecorn: 1800,
          "Caramel Corn": 1700,
          Lemonade: 1700,
          "Cotton Candy": 1100,
        },
        "Stand 3": {
          Kettlecorn: 1500,
          "Caramel Corn": 2300,
          Lemonade: 1500,
          "Cotton Candy": 900,
        },
      },
    },
    {
      date: "2025-06-06",
      location: "Golden 1 Center",
      vendors: {
        "F. Weasley": {
          Kettlecorn: 3500,
          "Caramel Corn": 4000,
          Lemonade: 2900,
          "Cotton Candy": 2100,
        },
        "N. Uzumaki": {
          Kettlecorn: 2400,
          "Caramel Corn": 2700,
          Lemonade: 1900,
          "Cotton Candy": 1400,
        },
        "Stand 1": {
          Kettlecorn: 2000,
          "Caramel Corn": 2200,
          Lemonade: 1600,
          "Cotton Candy": 1200,
        },
      },
    },
  ] as StadiumVendorBreakdown[],

  expenseGroups: [
    {
      id: "product",
      label: "Product",
      meta: "Inventory, food, supplies",
      amount: 198000,
      percent: 33,
      paid: 232,
      upcoming: 49,
      accent: "gold",
    },
    {
      id: "staff",
      label: "Staff",
      meta: "Payroll, taxes, support",
      amount: 168000,
      percent: 28,
      paid: 168,
      upcoming: 70,
      accent: "green",
    },
    {
      id: "facilities",
      label: "Facilities / Equip",
      meta: "Kitchen, storage, equipment, upkeep",
      amount: 72000,
      percent: 12,
      paid: 142,
      upcoming: 46,
      accent: "goldDeep",
    },
    {
      id: "venues",
      label: "Venues",
      meta: "Venue fees, permits, event access",
      amount: 162000,
      percent: 27,
      paid: 96,
      upcoming: 38,
      accent: "greenSoft",
    },
  ] as ExpenseGroup[],

kpis: [
  { id: "projected-ytd", value: "$1.38M", sub: "+$20K vs plan", trend: "up" },
  { id: "top-venue", value: "Golden 1 Center", sub: "Event avg $1K less than last month", trend: "down" },
  { id: "revenue-per-event", value: "$6,850", sub: "+4% vs last month", trend: "up" },
  { id: "next-7-days", value: "10 Events", sub: "6 locations", trend: "up" },
  { id: "underperformer", value: "Cotton Candy", sub: "-6% vs last month", trend: "down" },
  { id: "margin", value: "13.4%", sub: "-1.2% vs target", trend: "down" },
  { id: "labor-rate", value: "28%", sub: "Within 28–30% target", trend: "neutral" },
  { id: "cost-overrun", value: "Venues", sub: "+4.1% above forecast", trend: "down" },
] as KPIRecord[],
} as const;