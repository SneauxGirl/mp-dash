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
          <div className={styles.brandToggle} aria-hidden="true" />
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
          <div className={styles.statusBadge} aria-hidden="true" />
          <div>
            <div className={styles.statusLabel}>System Status</div>
            <div className={styles.statusState}>Online</div>
          </div>
        </section>
      </div>
    </aside>
  );
}