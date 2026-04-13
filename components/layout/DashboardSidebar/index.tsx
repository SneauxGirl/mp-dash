import styles from "./DashboardSidebar.module.scss";

export default function DashboardSidebar() {
  return (
    <aside className={`${styles.sidebar} panel`}>
      <div className="panelTopline" />
      <div className={`${styles.sidebarInner} panelContent`}>
        <div className={styles.brand}>
          <div className={styles.brandMark} aria-hidden="true">
            <img src="/MPMono.png" alt="MP logo" className={styles.logo} />
          </div>
          <div className={styles.brandCopy}>
            <div className="eyebrow">Mr. Pops</div>
            <div className={styles.brandTitle}>Dashboard</div>
          </div>
          <div className="controlSquare controlSquare--left" aria-hidden="true" >
  ‹
</div>
        </div>

        <nav className={styles.nav} aria-label="Sidebar navigation">
          <a className={`${styles.navItem} ${styles.active}`} href="#">
            <span className={styles.navIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 20V10" />
                <path d="M10 20V4" />
                <path d="M16 20v-7" />
                <path d="M22 20H2" />
              </svg>
            </span>
            <span>Dashboard</span>
          </a>

          <a className={styles.navItem} href="#">
            <span className={styles.navIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 12h4l2-6 4 12 2-6h6" />
              </svg>
            </span>
            <span>Monitoring</span>
          </a>

          <a className={styles.navItem} href="#">
            <span className={styles.navIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 3h7l5 5v13H7z" />
                <path d="M14 3v6h6" />
                <path d="M10 13h6" />
                <path d="M10 17h6" />
              </svg>
            </span>
            <span>Reports</span>
          </a>

          <a className={styles.navItem} href="#">
            <span className={styles.navIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                <path d="M5 21a7 7 0 0 1 14 0" />
              </svg>
            </span>
            <span>Profile</span>
          </a>
        </nav>

        <div className={styles.spacer} />

        <section className={styles.status} aria-label="System status">
          <a
  href="https://github.com/sneauxgirl"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.statusBadge}
  aria-label="View GitHub profile"
>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85.004 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.56 1.4.21 2.44.1 2.7.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
    />
  </svg>
</a>
          <div>
            <div className={styles.statusLabel}>System Status</div>
            <div className={styles.statusState}>Online</div>
          </div>
        </section>
      </div>
    </aside>
  );
}