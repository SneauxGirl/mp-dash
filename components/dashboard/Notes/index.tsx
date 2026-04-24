"use client";

import styles from "./Notes.module.scss";

type NotesProps = {
  compact?: boolean;
};

export default function Notes({ compact = false }: NotesProps) {
  return (
    <section
      className={`panel ${styles.notes} ${compact ? styles.compact : ""}`}
    >
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <header className={styles.header}>
          <div>
            <div className="eyebrow">Virtual Assistant</div>
            <h2 className={styles.title}>Notes & To-dos</h2>
          </div>

          <div className={styles.status}>
            <span className={styles.statusDot} />
            AI Ready
          </div>
        </header>

        <div className={styles.composer}>
          <label className={styles.label}>Quick capture</label>

          <div className={styles.inputWrap}>
            <textarea
              className={styles.textarea}
              placeholder="Update the schedule, place an order, send an email, analyze data and more..."
            />

            <div className={styles.actions}>
              <button className={styles.iconBtn} aria-label="Voice input">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z" />
                  <path d="M6 11a6 6 0 0 0 12 0" />
                  <path d="M12 17v4" />
                  <path d="M8.5 21h7" />
                </svg>
              </button>

              <button className={styles.iconBtn} aria-label="Attach context">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 11.5 11.8 20.7a6 6 0 1 1-8.5-8.5l9.2-9.2a4 4 0 1 1 5.7 5.7L9.7 17.2a2 2 0 0 1-2.8-2.8l7.8-7.8" />
                </svg>
              </button>

              <button className={styles.primaryBtn}>Submit</button>
            </div>
          </div>
        </div>

        {/* <section className={styles.output}>
          <div className={styles.outputHead}>
            <div className={styles.outputTitle}>Suggested Actions</div>
            <button className={styles.textBtn}>
              Run comparison
            </button>
          </div>

          <div className={styles.items}>
            <article className={styles.item}>
              <button className={styles.check} />
              <div>
                <div className={styles.itemTitle}>
                  Review Event Costs vs April Revenue
                </div>
                <div className={styles.itemMeta}>
                  AI structured from captured note · Priority High
                </div>
              </div>
            </article>

            <article className={styles.item}>
              <button className={styles.check} />
              <div>
                <div className={styles.itemTitle}>
                  Draft reorder list for popcorn supplies by Friday
                </div>
                <div className={styles.itemMeta}>
                  Linked to Product Costs · Suggested next step
                </div>
              </div>
            </article>

            <article className={styles.item}>
              <button className={styles.check} />
              <div>
                <div className={styles.itemTitle}>
                  Calculate labor ratio for Golden 1 and UCDavis
                </div>
                <div className={styles.itemMeta}>
                  Comparison request queued · 2 locations
                </div>
              </div>
            </article>
          </div>
        </section> */}
      </div>
    </section>
  );
}
