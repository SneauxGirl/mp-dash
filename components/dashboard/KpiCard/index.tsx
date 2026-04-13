import styles from "./KpiCard.module.scss";
import type { ReactNode } from "react";

type KpiCardProps = {
  icon: ReactNode;
  trend: string;
  trendDirection: "up" | "down";
  value: string;
  label: string;
  meta: string;
};

export default function KpiCard({
  icon,
  trend,
  trendDirection,
  value,
  label,
  meta,
}: KpiCardProps) {
  return (
    <article className={`panel ${styles.kpiCard}`}>
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.iconWrap} aria-hidden="true">
            <span className={styles.icon}>{icon}</span>
          </div>

          <div
            className={`${styles.trend} ${
              trendDirection === "up" ? styles.trendUp : styles.trendDown
            }`}
          >
            {trend}
          </div>
        </div>

        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
        <div className={styles.meta}>{meta}</div>
      </div>
    </article>
  );
}