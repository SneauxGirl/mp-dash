import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function HomePage() {
  return (
    <>
      <div className="edgeLights" />

      <div className="dashboardShell">
        <DashboardSidebar />
        <main className="main">
          <section className="topStrip panel" aria-label="Upcoming events and weather">
            <div className="panelTopline" />
            <div className="panelContent">
              TOP STRIP SLOT
            </div>
          </section>

          <section className="kpiGrid" aria-label="At a glance metrics">
            <article className="panel">
              <div className="panelTopline" />
              <div className="panelContent">KPI 1</div>
            </article>

            <article className="panel">
              <div className="panelTopline" />
              <div className="panelContent">KPI 2</div>
            </article>

            <article className="panel">
              <div className="panelTopline" />
              <div className="panelContent">KPI 3</div>
            </article>

            <article className="panel">
              <div className="panelTopline" />
              <div className="panelContent">KPI 4</div>
            </article>

            <article className="panel">
              <div className="panelTopline" />
              <div className="panelContent">KPI 5</div>
            </article>

            <article className="panel">
              <div className="panelTopline" />
              <div className="panelContent">KPI 6</div>
            </article>

            <article className="panel">
              <div className="panelTopline" />
              <div className="panelContent">KPI 7</div>
            </article>

            <article className="panel">
              <div className="panelTopline" />
              <div className="panelContent">KPI 8</div>
            </article>
          </section>

          <section className="contentRow" aria-label="Dashboard content">
            <div className="colExpense">
              <article className="panel">
                <div className="panelTopline" />
                <div className="panelContent">EXPENSE GROUPS SLOT</div>
              </article>
            </div>

            <div className="col-main">
              <article className="panel">
                <div className="panelTopline" />
                <div className="panel-content">REVENUE BY MONTH SLOT</div>
              </article>

              <article className="panel">
                <div className="panelTopline" />
                <div className="panelContent">TOP PRODUCTS SLOT</div>
              </article>
            </div>

            <div className="colSide">
              <article className="panel">
                <div className="panelTopline" />
                <div className="panelContent">NOTES / ACTION CONSOLE SLOT</div>
              </article>

              <article className="panel">
                <div className="panelTopline" />
                <div className="panelContent">MONTHLY TARGETS SLOT</div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}