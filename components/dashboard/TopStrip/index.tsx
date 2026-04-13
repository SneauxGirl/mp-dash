import styles from "./TopStrip.module.scss";

const upcomingEvents = [
  "3/4 Fri 7PM — Golden 1: Raye",
  "3/5 Sat 1PM — UCD: Aggies",
  "3/6 Sun 11AM — Cal Expo: Market",
];

const tickerItems = [
  "K. Pratico — off",
  "Deliver 400 bags kettle to G1",
  "UCD restock delayed 20 min",
  "Confirm freezer inventory after close",
];

export default function TopStrip() {
  return (
    <section className={`panel ${styles.topStrip}`} aria-label="Upcoming events and current status">
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
<div className={styles.eventsBlock}>
  <div className={styles.eventsRow}>
    <div className={styles.eventsList}>
      {upcomingEvents.slice(0, 2).map((event, index) => (
        <div
          key={event}
          className={`${styles.eventItem} ${
            index === 0 ? styles.eventPrimary : ""
          }`}
        >
          {event}
        </div>
      ))}
    </div>

          <div className="controlSquare controlSquare--down" aria-hidden="true" >
  ‹
</div>
  </div>
</div>
<div className={styles.nowBlock}>
  <div className={styles.nowTopRow}>
    <span className={styles.dateText}>Jun 30, 2025</span>
    <span className={styles.divider}>|</span>
    <span className={styles.timeText}>7:40 PM</span>
  </div>

  <div className={styles.weatherRow}>
    <span className={styles.weatherIcon}>☀</span>
    <span className={styles.weatherText}>
      72° Clear — Sacramento
    </span>
  </div>
</div>
        <div className={styles.tickerBlock}>
          <div className={styles.tickerViewport}>
            <div className={styles.tickerTrack}>
              {tickerItems.concat(tickerItems).map((item, index) => (
                <span key={`${item}-${index}`} className={styles.tickerItem}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}