import styles from "./RevenueByMonth.module.scss";
import { dashboardData } from "@/data/dashboardData";

type MonthData = {
  month: string;
  events: number;
  retail: number;
  stands: number;
  online: number;
};

function formatAxisLabel(value: number) {
  if (value === 0) return "0k";
  return `${Math.round(value / 1000)}k`;
}

export default function RevenueByMonth() {
  const revenueData = dashboardData.revenueByMonth as MonthData[];

  const totals = revenueData.map((item) => ({
    ...item,
    total: item.events + item.retail + item.stands + item.online,
  }));

  const maxTotal = Math.max(...totals.map((item) => item.total), 1);
  const axisMax = Math.ceil(maxTotal / 10000) * 10000;

  const axisTicks = [axisMax, axisMax * 0.75, axisMax * 0.5, axisMax * 0.25, 0];

  const chartHeight = 130;
  const compactMonthLabel = (month: string) => month.charAt(0);

  return (
    <section className={`panel ${styles.revenueByMonth}`}>
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <header className={styles.header}>
          <div>
            <div className="eyebrow">Revenue Tracking</div>
            <h2 className={styles.title}>Revenue by Month</h2>
          </div>

          <div className={styles.controls}>
            <button type="button" className={styles.pill}>
              Location
            </button>
            <button type="button" className={styles.pill}>
              Jun 2025
            </button>
          </div>
        </header>

        <div className={styles.chartWrap}>
          <div className={styles.chartGrid} />

          <div className={styles.yAxis}>
            {axisTicks.map((tick) => (
              <span key={tick}>{formatAxisLabel(tick)}</span>
            ))}
          </div>

          <div className={styles.plot}>
            {totals.map((item) => {
              const eventsHeight = (item.events / axisMax) * chartHeight;
              const retailHeight = (item.retail / axisMax) * chartHeight;
              const standsHeight = (item.stands / axisMax) * chartHeight;
              const onlineHeight = (item.online / axisMax) * chartHeight;

              return (
                <div key={item.month} className={styles.month}>
                  <div className={styles.stack}>
                    <div className={styles.stackFill}>
                      <span
                        className={`${styles.seg} ${styles.segEvents}`}
                        style={{ height: `${eventsHeight}px` }}
                      />
                      <span
                        className={`${styles.seg} ${styles.segRetail}`}
                        style={{ height: `${retailHeight}px` }}
                      />
                      <span
                        className={`${styles.seg} ${styles.segStands}`}
                        style={{ height: `${standsHeight}px` }}
                      />
                      <span
                        className={`${styles.seg} ${styles.segOnline}`}
                        style={{ height: `${onlineHeight}px` }}
                      />
                    </div>
                  </div>

                  <span className={styles.label}>
                    {item.month.length > 1
                      ? compactMonthLabel(item.month)
                      : item.month}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ✅ LEGEND — INSIDE chartWrap */}
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span
                className={`${styles.legendSwatch} ${styles.legendSwatchEvents}`}
              />
              Events
            </span>
            <span className={styles.legendItem}>
              <span
                className={`${styles.legendSwatch} ${styles.legendSwatchRetail}`}
              />
              Retail
            </span>
            <span className={styles.legendItem}>
              <span
                className={`${styles.legendSwatch} ${styles.legendSwatchStands}`}
              />
              Stands
            </span>
            <span className={styles.legendItem}>
              <span
                className={`${styles.legendSwatch} ${styles.legendSwatchOnline}`}
              />
              Online
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
