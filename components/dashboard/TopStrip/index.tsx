"use client";

import { useMemo, useState } from "react";
import styles from "./TopStrip.module.scss";
import { dashboardData } from "@/data/dashboardData";
import { controlIconMap } from "@/data/iconMap";

type TopStripProps = {
  onOpenSidebar: () => void;
};

function formatEvent(event: { date: string; location: string; type: string }) {
  const d = new Date(`${event.date}T12:00:00`);

  const dateStr = d.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
  });

  const weekday = d.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const locationShortMap: Record<string, string> = {
    "Golden 1 Center": "Golden 1",
    "UCD Stadium": "UCD",
    "Cal Expo": "Cal Expo",
    "Sutter Health Park": "Sutter",
    "Downtown Plaza": "Downtown",
    "Roseville Fairgrounds": "Roseville",
  };

  return `${dateStr} ${weekday} — ${locationShortMap[event.location] ?? event.location}: ${event.type}`;
}

export default function TopStrip({ onOpenSidebar }: TopStripProps) {
  const [eventIndex, setEventIndex] = useState(0);

  const events = dashboardData.upcomingEvents;
  const tickerItems = dashboardData.tickerItems;

  const MenuIcon = controlIconMap.menu;
  const ChevronUpIcon = controlIconMap.up;
  const ChevronDownIcon = controlIconMap.down;

  const visibleEvents = useMemo(() => {
    if (events.length <= 2) return events;

    return [events[eventIndex], events[(eventIndex + 1) % events.length]];
  }, [eventIndex, events]);

  function handlePrevEvents() {
    if (events.length <= 2) return;
    setEventIndex((prev) => (prev - 1 + events.length) % events.length);
  }

  function handleNextEvents() {
    if (events.length <= 2) return;
    setEventIndex((prev) => (prev + 1) % events.length);
  }

  return (
    <section
      className={`panel ${styles.topStrip}`}
      aria-label="Upcoming events and current status"
    >
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <div className={styles.mobileTitleRow}>
          <button
            type="button"
            className={`${styles.mobileMenuButton} controlSquare`}
            aria-label="Open sidebar"
            onClick={onOpenSidebar}
          >
            <MenuIcon />
          </button>

          <div className={styles.mobileTitle}>Mr. Pops Dashboard</div>
        </div>

        <div className={styles.nowBlock}>
          <div className={styles.nowTopRow}>
            <span className={styles.dateText}>Jun 9, 2025</span>
            <span className={styles.divider}>|</span>
            <span className={styles.timeText}>7:40 PM</span>
          </div>

          <div className={styles.weatherRow}>
            <span className={styles.weatherIcon}>☀</span>
            <span className={styles.weatherText}>72° Clear — Sacramento</span>
          </div>
        </div>

        <div className={styles.eventsBlock}>
          <div className={styles.eventsRow}>
            <div className={styles.eventsList}>
              {visibleEvents.map((event, index) => (
                <div
                  key={`${event.id}-${index}`}
                  className={`${styles.eventItem} ${
                    index === 0 ? styles.eventPrimary : ""
                  }`}
                >
                  {formatEvent(event)}
                </div>
              ))}
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className="controlSquare"
                onClick={handlePrevEvents}
                aria-label="Previous events"
              >
                <ChevronUpIcon />
              </button>

              <button
                type="button"
                className="controlSquare"
                onClick={handleNextEvents}
                aria-label="Next events"
              >
                <ChevronDownIcon />
              </button>
            </div>
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
