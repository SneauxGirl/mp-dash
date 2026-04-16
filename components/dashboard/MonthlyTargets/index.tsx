import styles from "./MonthlyTargets.module.scss";
import { dashboardData } from "@/data/dashboardData";

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

type ChartPoint = {
  day: number;
  value: number;
};

function getDayOfMonth(dateString: string) {
  return new Date(`${dateString}T12:00:00`).getDate();
}

function xForDay(
  day: number,
  totalDays: number,
  width: number,
  paddingLeft: number,
  paddingRight: number
) {
  const innerWidth = width - paddingLeft - paddingRight;
  const normalized = (day - 1) / Math.max(totalDays - 1, 1);

  return paddingLeft + normalized * innerWidth;
}

function yForValue(
  value: number,
  maxValue: number,
  height: number,
  paddingTop: number,
  paddingBottom: number
) {
  const innerHeight = height - paddingTop - paddingBottom;
  return paddingTop + innerHeight - (value / maxValue) * innerHeight;
}

function buildPathFromPoints(
  points: ChartPoint[],
  totalDays: number,
  width: number,
  height: number,
  maxValue: number,
  paddingLeft: number,
  paddingRight: number,
  paddingTop = 14,
  paddingBottom = 18
) {
  if (!points.length) return "";

  return points
    .map((point, index) => {
      const x = xForDay(point.day, totalDays, width, paddingLeft, paddingRight);
      const y = yForValue(
        point.value,
        maxValue,
        height,
        paddingTop,
        paddingBottom
      );

      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function buildSvgPoints(
  points: ChartPoint[],
  totalDays: number,
  width: number,
  height: number,
  maxValue: number,
  paddingLeft: number,
  paddingRight: number,
  paddingTop = 14,
  paddingBottom = 18
) {
  return points.map((point) => ({
    day: point.day,
    x: xForDay(point.day, totalDays, width, paddingLeft, paddingRight),
    y: yForValue(point.value, maxValue, height, paddingTop, paddingBottom),
  }));
}

export default function MonthlyTargets() {
  const { currentMonth, monthlyTargets, dailyCurrentMonthSales } = dashboardData;

  const target =
    monthlyTargets.find((item) => item.month === currentMonth.month)?.target ?? 0;

  const dailyTotalsMap = new Map<number, number>();

  dailyCurrentMonthSales.forEach((entry) => {
    const day = getDayOfMonth(entry.date);
    const total = Object.values(entry.sales).reduce(
      (sum, value) => sum + value,
      0
    );

    dailyTotalsMap.set(day, (dailyTotalsMap.get(day) ?? 0) + total);
  });

  const completedDays = Array.from(dailyTotalsMap.keys()).sort((a, b) => a - b);

  let runningActual = 0;
  const actualPoints: ChartPoint[] = [{ day: 1, value: 0 }];

  completedDays.forEach((day) => {
    runningActual += dailyTotalsMap.get(day) ?? 0;
    actualPoints.push({ day, value: runningActual });
  });

  const actual = runningActual;
  const gap = actual - target;

  const totalDays = currentMonth.daysInMonth;

  const latestCompletedDay = completedDays.at(-1) ?? 1;
  const expectedToDate = (target / totalDays) * latestCompletedDay;
  const paceDelta = actual - expectedToDate;
  const isAheadOfPace = paceDelta >= 0;

  const pacePoints: ChartPoint[] = [
    { day: 1, value: 0 },
    { day: totalDays, value: target },
  ];

  const chartWidth = 760;
  const chartHeight = 180;

  // extra left inset accounts for the visual glass bar + breathing room
 const chartPaddingLeft = 28;
const chartPaddingRight = 16;
const chartPaddingTop = 10;
const chartPaddingBottom = 14;

  const maxValue = Math.max(target, actual, 1) * 1.06;

  const actualPath = buildPathFromPoints(
    actualPoints,
    totalDays,
    chartWidth,
    chartHeight,
    maxValue,
    chartPaddingLeft,
    chartPaddingRight,
    chartPaddingTop,
    chartPaddingBottom
  );

  const targetPath = buildPathFromPoints(
    pacePoints,
    totalDays,
    chartWidth,
    chartHeight,
    maxValue,
    chartPaddingLeft,
    chartPaddingRight,
    chartPaddingTop,
    chartPaddingBottom
  );

  const actualSvgPoints = buildSvgPoints(
    actualPoints.slice(1),
    totalDays,
    chartWidth,
    chartHeight,
    maxValue,
    chartPaddingLeft,
    chartPaddingRight,
    chartPaddingTop,
    chartPaddingBottom
  ).filter((point) => point.day % 5 === 0 || point.day === completedDays.at(-1));

  const days = Array.from({ length: totalDays }, (_, index) => index + 1).filter(
    (day) => day % 5 === 0
  );

  return (
    <section className={`panel ${styles.monthlyTargets}`}>
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <header className={styles.header}>
          <div>
            <div className="eyebrow">Performance</div>
            <h2 className={styles.title}>Monthly Targets</h2>
          </div>

          <div className={styles.datePill}>
            {currentMonth.month} {currentMonth.year}
          </div>
        </header>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Target</div>
            <div className={styles.metricValue}>{formatCurrency(target)}</div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricLabel}>Actual</div>
<div
  className={`${styles.metricValue} ${
    isAheadOfPace ? styles.positive : ""
  }`}
>
  {/* {isAheadOfPace ? "▲ " : "▼ "} */}
  {formatCurrency(actual)}
</div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricLabel}>Gap</div>
            <div
              className={`${styles.metricValue} ${
                gap >= 0 ? styles.positive : ""
              }`}
            >
              {gap > 0 ? "+" : ""}
              {formatCurrency(gap)}
            </div>
          </div>
        </div>

        <div className={styles.chart}>
          <div className={styles.chartGrid} />

          <svg
            className={styles.svg}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mtGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffd75c" />
                <stop offset="55%" stopColor="#c8ff5a" />
                <stop offset="100%" stopColor="#8dfc72" />
              </linearGradient>
            </defs>

            <path d={targetPath} className={styles.targetLine} />
            <path d={actualPath} className={styles.line} />

            <g className={styles.points}>
              {actualSvgPoints.map((point) => (
                <circle
                  key={`day-${point.day}`}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                />
              ))}
            </g>
          </svg>

          <div className={styles.monthLabels} aria-hidden="true">
            {days.map((day, index) => {
              const leftPercent =
                (xForDay(
                  day,
                  totalDays,
                  chartWidth,
                  chartPaddingLeft,
                  chartPaddingRight
                ) /
                  chartWidth) *
                100;

              const isFirst = index === 0;
              const isLast = index === days.length - 1;

              return (
                <span
                  key={day}
                  className={`${styles.monthLabel} ${
                    completedDays.includes(day) ? styles.monthLabelActive : ""
                  }`}
                  style={{
                    left: `${leftPercent}%`,
                    transform: isFirst
                      ? "translateX(0%)"
                      : isLast
                        ? "translateX(-100%)"
                        : "translateX(-50%)",
                  }}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}