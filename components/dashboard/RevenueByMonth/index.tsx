import styles from "./RevenueByMonth.module.scss";

type MonthData = {
  month: string;
  events: number;
  retail: number;
  stands: number;
  online: number;
};

const revenueData: MonthData[] = [
  { month: "Jan", events: 96, retail: 52, stands: 44, online: 26 },
  { month: "Feb", events: 74, retail: 46, stands: 34, online: 18 },
  { month: "Mar", events: 78, retail: 58, stands: 40, online: 24 },
  { month: "Apr", events: 90, retail: 66, stands: 52, online: 28 },
  { month: "May", events: 112, retail: 60, stands: 46, online: 24 },
  { month: "Jun", events: 132, retail: 74, stands: 56, online: 34 },
  { month: "Jul", events: 62, retail: 42, stands: 30, online: 14 },
  { month: "Aug", events: 0, retail: 0, stands: 0, online: 0 },
  { month: "Sep", events: 0, retail: 0, stands: 0, online: 0 },
  { month: "Oct", events: 0, retail: 0, stands: 0, online: 0},
  { month: "Nov", events: 0, retail: 0, stands: 0, online: 0 },
  { month: "Dec", events: 0, retail: 0, stands: 0, online: 0 },
];

export default function RevenueByMonth() {
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
              Custom Dates
            </button>
            <button type="button" className={styles.pill}>
              Group by Location
            </button>
          </div>
        </header>

        <div className={styles.chartWrap}>
          <div className={styles.chartGrid} />

          <div className={styles.yAxis}>
            <span>800k</span>
            <span>600k</span>
            <span>400k</span>
            <span>200k</span>
            <span>0k</span>
          </div>

          <div className={styles.plot}>
            {revenueData.map((item) => (
              <div key={item.month} className={styles.month}>
                <div className={styles.stack}>
                  <span
                    className={`${styles.seg} ${styles.segEvents}`}
                    style={{ height: `${item.events}px` }}
                  />
                  <span
                    className={`${styles.seg} ${styles.segRetail}`}
                    style={{ height: `${item.retail}px` }}
                  />
                  <span
                    className={`${styles.seg} ${styles.segStands}`}
                    style={{ height: `${item.stands}px` }}
                  />
                  <span
                    className={`${styles.seg} ${styles.segOnline}`}
                    style={{ height: `${item.online}px` }}
                  />
                </div>

                <span className={styles.label}>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendSwatchEvents}`} />
            Events
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendSwatchRetail}`} />
            Retail
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendSwatchStands}`} />
            Stands
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendSwatchOnline}`} />
            Online
          </span>
        </div>
      </div>
    </section>
  );
}