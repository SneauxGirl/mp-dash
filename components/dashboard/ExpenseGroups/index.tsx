import styles from "./ExpenseGroups.module.scss";
import { dashboardData } from "@/data/dashboardData";

const accentVars = {
  gold: "var(--gold)",
  green: "var(--green)",
  goldDeep: "var(--gold-2)",
  greenSoft: "var(--green-2)",
} as const;

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatPercent(value: number) {
  return `${value}%`;
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

export default function ExpenseGroups() {
  const groups = dashboardData.expenseGroups;
  const trackedTotal = groups.reduce((sum, group) => sum + group.amount, 0);

  const ringConfig = [
    { id: "product", size: 95, stroke: 21 },
    { id: "staff", size: 78, stroke: 20 },
    { id: "facilities", size: 62, stroke: 19 },
    { id: "venues", size: 47, stroke: 18 },
  ] as const;

  const chartSize = 420;
  const center = chartSize / 2;

  const ringStartAngle = 0;
  const ringSpanDegrees = 270;

  return (
    <section className={`panel ${styles.expenseGroups}`}>
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <header className={styles.header}>
          <div>
            <div className="eyebrow">Budget Tracking</div>
            <h2 className={styles.title}>Expense Groups</h2>
            <p className={styles.subtitle} />
          </div>

<div className={styles.headerTotal}>
  <span className={styles.totalLabel}>YTD</span>
  <span className={styles.totalValue}>{formatCurrency(trackedTotal)}</span>
</div>
        </header>

        <div className={styles.layout}>
          <section className={styles.ringsPanel} aria-label="Expense group rings">
            <div className={styles.radarGrid} />

            <div className={styles.chartShell}>
              <div className={styles.labelColumn} aria-hidden="true">
                {groups.map((group) => (
                  <div
                    key={`${group.id}-tag`}
                    className={`${styles.ringLabel} ${styles[`label${group.id.charAt(0).toUpperCase()}${group.id.slice(1)}`]}`}
                    style={{ color: accentVars[group.accent] }}
                  >
                    {group.label}
                  </div>
                ))}
              </div>

              <div className={styles.ringFrame}>
                <svg
                  className={styles.ringSvg}
                  viewBox={`0 0 ${chartSize} ${chartSize}`}
                  aria-hidden="true"
                >
                  {ringConfig.map((config) => {
                    const group = groups.find((item) => item.id === config.id)!;
                    const accent = accentVars[group.accent];

                    const totalBudget = Math.max(group.amount, 1);
                    const paidRatio = Math.max(
                      0,
                      Math.min(group.paid / totalBudget, 1)
                    );
                    const upcomingRatio = Math.max(
                      0,
                      Math.min(group.upcoming / totalBudget, 1 - paidRatio)
                    );

                    const paidDegrees = paidRatio * ringSpanDegrees;
                    const upcomingDegrees = upcomingRatio * ringSpanDegrees;

                    const radius =
                      ((chartSize * (config.size / 100)) - config.stroke) / 2;

                    const trackArc = describeArc(
                      center,
                      center,
                      radius,
                      ringStartAngle,
                      ringStartAngle + ringSpanDegrees
                    );

                    const paidEndAngle = ringStartAngle + paidDegrees;
                    const upcomingEndAngle = paidEndAngle + upcomingDegrees;

                    const paidArc =
                      paidDegrees > 0
                        ? describeArc(
                            center,
                            center,
                            radius,
                            ringStartAngle,
                            paidEndAngle
                          )
                        : "";

                    const upcomingArc =
                      upcomingDegrees > 0
                        ? describeArc(
                            center,
                            center,
                            radius,
                            paidEndAngle,
                            upcomingEndAngle
                          )
                        : "";

                    return (
                      <g key={group.id}>
                        <path
                          d={trackArc}
                          className={styles.ringTrack}
                          style={{ strokeWidth: config.stroke }}
                        />

                        {upcomingArc && (
                          <path
                            d={upcomingArc}
                            className={styles.ringUpcoming}
                            style={
                              {
                                stroke: accent,
                                strokeWidth: config.stroke,
                              } as React.CSSProperties
                            }
                          />
                        )}

                        {paidArc && (
                          <path
                            d={paidArc}
                            className={styles.ringPaid}
                            style={
                              {
                                stroke: accent,
                                strokeWidth: config.stroke,
                              } as React.CSSProperties
                            }
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                <div className={styles.ringCore}>
                  <div>
                    <span className={styles.coreLabel}>Budget</span>
                    <span className={styles.coreValue}>2026</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside
            className={styles.legendPanel}
            aria-label="Expense group breakdown"
          >
            <div className={styles.panelTitle}>Group Breakdown</div>

            <div className={styles.legendList}>
              {groups.map((group) => (
                <article
                  key={`${group.id}-legend`}
                  className={styles.legendItem}
                  style={{ ["--swatch" as string]: accentVars[group.accent] }}
                >
                  <div className={styles.legendSwatch} />

                  <div className={styles.legendCopy}>
                    <div className={styles.legendLabel}>{group.label}</div>
                    {/* <div className={styles.legendMeta}>{group.meta}</div> */}
                  </div>

                  <div className={styles.legendStats}>
                    <div className={styles.legendAmount}>
                      {formatCurrency(group.amount)}
                    </div>
                    <div className={styles.legendPercent}>
                      {formatPercent(group.percent)}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.footerNote}>
              {/* <p>Include annual and pending expenses for a more complete view.</p> */}

              <div className={styles.dotKey} aria-label="Ring key">
                <span className={styles.dotItem}>
                  <span className={styles.dot} />
                  Paid funds
                </span>

                <span className={styles.dotItem}>
                  <span className={`${styles.dot} ${styles.upcomingDot}`} />
                  Known upcoming
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}