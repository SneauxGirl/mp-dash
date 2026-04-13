import DashboardSidebar from "@/components/layout/DashboardSidebar";
import ExpenseGroups from "@/components/dashboard/ExpenseGroups";
import RevenueByMonth from "@/components/dashboard/RevenueByMonth";
import MonthlyTargets from "@/components/dashboard/MonthlyTargets";
import Notes from "@/components/dashboard/Notes";
import TopProducts from "@/components/dashboard/TopProducts";
import TopStrip from "@/components/dashboard/TopStrip";

export default function HomePage() {
  return (
    <>
      <div className="edgeLights" />

      <div className="dashboardShell">
        <DashboardSidebar />
        <main className="main">
<TopStrip />
<div className="mainScroll">
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
    <ExpenseGroups />
  </div>

  <div className="colMain">
  <RevenueByMonth />
  <TopProducts />
</div>

  <div className="colSide">
    <Notes />
    <MonthlyTargets />
  </div>
</section>
</div>
        </main>
      </div>
    </>
  );
}