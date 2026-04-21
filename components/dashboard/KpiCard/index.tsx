import styles from "./KpiCard.module.scss";
import type { ReactNode } from "react";

export type KPITrend = "up" | "down" | "neutral";

type KpiCardProps = {
  icon: ReactNode;
  trend: KPITrend;
  value: string;
  eyebrow: string;
  sub: string;
};

export default function KpiCard({
  icon,
  trend,
  value,
  eyebrow,
  sub,
}: KpiCardProps) {
  const trendSymbolMap = {
    up: "▲",
    down: "▼",
    neutral: "•",
  } as const;

  const trendClass =
    trend === "down"
      ? styles.trendDown
      : trend === "neutral"
        ? styles.trendNeutral
        : styles.trendUp;

  return (
    <article className={`panel ${styles.kpiCard}`}>
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <div className={styles.header}>
          <div className={styles.headerMain}>
            <div className={styles.statusBadge} aria-hidden="true">
              <span className={styles.iconGlyph}>{icon ?? null}</span>
            </div>

            <div className="eyebrow">{eyebrow}</div>
          </div>

          <div className={`${styles.trend} ${trendClass}`}>
            {trendSymbolMap[trend]}
          </div>
        </div>

        <div className={styles.surface}>
          <div className={styles.value}>{value}</div>
          <div className={styles.meta}>{sub}</div>
        </div>
      </div>
    </article>
  );
}
