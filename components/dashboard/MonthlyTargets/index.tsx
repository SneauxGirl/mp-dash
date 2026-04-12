import styles from "./MonthlyTargets.module.scss";

export default function MonthlyTargets() {
  return (
    <section className={`panel ${styles.monthlyTargets}`}>
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <header className={styles.header}>
          <div>
            <div className="eyebrow">Performance</div>
            <h2 className={styles.title}>Monthly Targets</h2>
          </div>

          <div className={styles.datePill}>Dec 2025</div>
        </header>

        {/* Metrics */}
        <div className={styles.metrics}>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Targets</div>
            <div className={styles.metricValue}>$25,000</div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricLabel}>Actual</div>
            <div className={`${styles.metricValue} ${styles.positive}`}>
              ▲ $22,850
            </div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricLabel}>Gap</div>
            <div className={styles.metricValue}>-$2,150</div>
            <div className={styles.deltaPill}>-8.6%</div>
          </div>
        </div>

        {/* Chart */}
        <div className={styles.chart}>
          <div className={styles.chartGrid} />

          <svg
            className={styles.svg}
            viewBox="0 0 760 280"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mtGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffd75c" />
                <stop offset="55%" stopColor="#c8ff5a" />
                <stop offset="100%" stopColor="#8dfc72" />
              </linearGradient>

              <filter id="mtBlur">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d="M20,235 L90,170 L170,140 L250,150 L330,92 L410,128 L490,95 L570,95 L650,46 L730,14"
              className={styles.line}
            />

            <g className={styles.points}>
              <circle cx="90" cy="170" r="6" />
              <circle cx="170" cy="140" r="6" />
              <circle cx="250" cy="150" r="6" />
              <circle cx="330" cy="92" r="6" />
              <circle cx="410" cy="128" r="6" />
              <circle cx="490" cy="95" r="6" />
              <circle cx="650" cy="46" r="6" />
              <circle cx="730" cy="14" r="6" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}