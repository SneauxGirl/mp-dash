type ExpenseGroup = {
  id: string;
  label: string;
  meta: string;
  amount: string;
  percent: string;
  paid: number;
  upcoming: number;
  accent: "gold" | "green" | "goldDeep" | "greenSoft";
  tagClass: string;
  ringClass: string;
};

import styles from "./ExpenseGroups.module.scss";

const groups: ExpenseGroup[] = [
  {
    id: "product",
    label: "Product",
    meta: "Inventory, food, supplies",
    amount: "$31,800",
    percent: "34%",
    paid: 232,
    upcoming: 49,
    accent: "gold",
    tagClass: styles.tagProduct,
    ringClass: styles.ring1,
  },
  {
    id: "staff",
    label: "Staff",
    meta: "Payroll, taxes, support",
    amount: "$26,400",
    percent: "28%",
    paid: 168,
    upcoming: 70,
    accent: "green",
    tagClass: styles.tagStaff,
    ringClass: styles.ring2,
  },
  {
    id: "facilities",
    label: "Facilities / Equip",
    meta: "Storage, equipment, upkeep",
    amount: "$21,600",
    percent: "23%",
    paid: 142,
    upcoming: 46,
    accent: "goldDeep",
    tagClass: styles.tagFacilities,
    ringClass: styles.ring3,
  },
  {
    id: "venues",
    label: "Venues",
    meta: "Venue fees, permits, event access",
    amount: "$14,400",
    percent: "15%",
    paid: 96,
    upcoming: 38,
    accent: "greenSoft",
    tagClass: styles.tagVenues,
    ringClass: styles.ring4,
  },
];

const accentVars: Record<ExpenseGroup["accent"], string> = {
  gold: "var(--gold)",
  green: "var(--green)",
  goldDeep: "var(--gold-2)",
  greenSoft: "var(--green-2)",
};

export default function ExpenseGroups() {
  return (
    <section className={`panel ${styles.expenseGroups}`}>
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <header className={styles.header}>
          <div>
            <div className="eyebrow">Budget Tracking</div>
            <h2 className={styles.title}>Expense Groups</h2>
            <p className={styles.subtitle}>
            </p>
          </div>

          <div className={styles.headerTotal}>
            <div className={styles.totalLabel}>Tracked Total</div>
            <div className={styles.totalValue}>$94,200</div>
          </div>
        </header>

        <div className={styles.layout}>
          <section className={styles.ringsPanel} aria-label="Expense group rings">
            <div className={styles.radarGrid} />

            <div className={styles.ringStack}>
              <div className={styles.ringGuide} />
              {/* Fix these to correct positions and better visuals #TODO */}
              {/* <div className={`${styles.guidePercent} ${styles.gpTop}`}>0%</div>
              <div className={`${styles.guidePercent} ${styles.gpRight}`}>25%</div>
              <div className={`${styles.guidePercent} ${styles.gpBottom}`}>50%</div>
              <div className={`${styles.guidePercent} ${styles.gpLeft}`}>75%</div> */}

              {groups.map((group) => (
                <div
                  key={`${group.id}-tag`}
                  className={`${styles.ringTag} ${group.tagClass}`}
                  style={{ ["--tag" as string]: accentVars[group.accent] }}
                >
                  {group.label}
                </div>
              ))}

              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`${styles.ring} ${group.ringClass}`}
                  style={
                    {
                      ["--accent" as string]: accentVars[group.accent],
                      ["--paid" as string]: group.paid,
                      ["--upcoming" as string]: group.upcoming,
                    } as React.CSSProperties
                  }
                  aria-hidden="true"
                />
              ))}

              <div className={styles.ringCore}>
                <div>
                  <span className={styles.coreLabel}>Budget</span>
                  <span className={styles.coreValue}>2026</span>
                </div>
              </div>
            </div>
          </section>

          <aside className={styles.legendPanel} aria-label="Expense group breakdown">
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
                    <div className={styles.legendMeta}>{group.meta}</div>
                  </div>
                  <div className={styles.legendStats}>
                    <div className={styles.legendAmount}>{group.amount}</div>
                    <div className={styles.legendPercent}>{group.percent}</div>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.footerNote}>
              <p>
                Include annual and pending expenses for a more complete view.
              </p>

              <div className={styles.dotKey} aria-label="Ring key">
                <span className={styles.dotItem}>
                  <span className={styles.dot} />
                  Paid funds
                </span>
                <span className={styles.dotItem}>
                  <span className={`${styles.dot} ${styles.upcoming}`} />
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