import type { SVGProps } from "react";

// =======================
// BASE ICON COMPONENT
// =======================

function IconBase({
  children,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      {children}
    </svg>
  );
}

// =======================
// KPI ICONS
// =======================

const ActivityIcon = () => (
  <IconBase>
    <path d="M3 12h4l2-5 4 10 2-5h6" />
  </IconBase>
);

const TrendingUpIcon = () => (
  <IconBase>
    <path d="M3 17l6-6 4 4 7-7" />
    <path d="M14 8h6v6" />
  </IconBase>
);

const NavigationIcon = () => (
  <IconBase>
    <path d="M3 11l18-8-8 18-2-7-8-3z" />
  </IconBase>
);

const CalendarIcon = () => (
  <IconBase>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </IconBase>
);

const PieChartIcon = () => (
  <IconBase>
    <path d="M12 2v10h10" />
    <path d="M22 12a10 10 0 11-10-10" />
  </IconBase>
);

const BarChartIcon = () => (
  <IconBase>
    <path d="M4 20V10" />
    <path d="M10 20V4" />
    <path d="M16 20v-7" />
    <path d="M22 20H2" />
  </IconBase>
);

const CreditCardIcon = () => (
  <IconBase>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </IconBase>
);

const AlertCircleIcon = () => (
  <IconBase>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4M12 16h.01" />
  </IconBase>
);

// =======================
// CONTROL ICONS
// =======================

const MenuIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M5 7h14" />
    <path d="M5 12h14" />
    <path d="M5 17h14" />
  </svg>
);

const ChevronUpIcon = () => (
  <IconBase>
    <path d="M6 14l6-6 6 6" />
  </IconBase>
);

const ChevronDownIcon = () => (
  <IconBase>
    <path d="M6 10l6 6 6-6" />
  </IconBase>
);

const ChevronLeftIcon = () => (
  <IconBase>
    <path d="M14 6l-6 6 6 6" />
  </IconBase>
);

const ChevronRightIcon = () => (
  <IconBase>
    <path d="M10 6l6 6-6 6" />
  </IconBase>
);

// =======================
// WEATHER ICONS
// =======================

const SunIcon = () => (
  <IconBase>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5L19 19M5 19l-1.5 1.5M20.5 3.5L19 5" />
  </IconBase>
);

const CloudIcon = () => (
  <IconBase>
    <path d="M7 18h10a4 4 0 000-8 5 5 0 00-9.7-1.5A4 4 0 007 18z" />
  </IconBase>
);

const StormIcon = () => (
  <IconBase>
    <path d="M7 16h10a4 4 0 000-8 5 5 0 00-9.7-1.5A4 4 0 007 16z" />
    <path d="M13 16l-2 4h3l-2 4" />
  </IconBase>
);

const WindIcon = () => (
  <IconBase>
    <path d="M3 12h10a3 3 0 100-6" />
    <path d="M5 18h12a2 2 0 100-4" />
  </IconBase>
);

const MoonIcon = () => (
  <IconBase>
    <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
  </IconBase>
);

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
  menu: MenuIcon,
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