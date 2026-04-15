// KPI ICONS
import ActivityIcon from "@/app/assets/icons/activity.svg";
import TrendingUpIcon from "@/app/assets/icons/trending-up.svg";
import NavigationIcon from "@/app/assets/icons/navigation.svg";
import CalendarIcon from "@/app/assets/icons/calendar.svg";
import PieChartIcon from "@/app/assets/icons/pie-chart.svg";
import BarChartIcon from "@/app/assets/icons/bar-chart-2.svg";
import CreditCardIcon from "@/app/assets/icons/credit-card.svg";
import AlertCircleIcon from "@/app/assets/icons/alert-circle.svg";

// CONTROL ICONS
import ChevronUpIcon from "@/app/assets/icons/chevron-up.svg";
import ChevronDownIcon from "@/app/assets/icons/chevron-down.svg";
import ChevronLeftIcon from "@/app/assets/icons/chevron-left.svg";
import ChevronRightIcon from "@/app/assets/icons/chevron-right.svg";

// WEATHER ICONS
import SunIcon from "@/app/assets/icons/sun.svg";
import CloudIcon from "@/app/assets/icons/cloud-drizzle.svg";
import StormIcon from "@/app/assets/icons/cloud-lightning.svg";
import WindIcon from "@/app/assets/icons/wind.svg";
import MoonIcon from "@/app/assets/icons/moon.svg";

// =======================
// KPI ICON MAP
// =======================

export const kpiIconMap = {
  "projected-ytd": TrendingUpIcon,
  "top-venue": NavigationIcon,
  "revenue-per-event": ActivityIcon,
  "next-7-days": CalendarIcon,
  "underperformer": AlertCircleIcon,
  "margin": BarChartIcon,
  "labor-rate": PieChartIcon,
  "cost-overrun": CreditCardIcon,
} as const;

// =======================
// CONTROL ICON MAP
// =======================

export const controlIconMap = {
  up: ChevronUpIcon,
  down: ChevronDownIcon,
  left: ChevronLeftIcon,
  right: ChevronRightIcon,
} as const;

// =======================
// WEATHER ICON MAP
// =======================

export const weatherIconMap = {
  sun: SunIcon,
  clear: SunIcon,
  cloud: CloudIcon,
  rain: CloudIcon,
  storm: StormIcon,
  wind: WindIcon,
  night: MoonIcon,
} as const;