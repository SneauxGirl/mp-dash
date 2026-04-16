"use client";

import { useState, useEffect } from "react";

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import ExpenseGroups from "@/components/dashboard/ExpenseGroups";
import RevenueByMonth from "@/components/dashboard/RevenueByMonth";
import MonthlyTargets from "@/components/dashboard/MonthlyTargets";
import Notes from "@/components/dashboard/Notes";
import TopProducts from "@/components/dashboard/TopProducts";
import TopStrip from "@/components/dashboard/TopStrip";
import KpiCard from "@/components/dashboard/KpiCard";

import { dashboardData } from "@/data/dashboardData";
import { kpiIconMap } from "@/data/iconMap";

const KPI_LABELS: Record<string, string> = {
  "projected-ytd": "Projected YTD",
  "top-venue": "Top Venue",
  "revenue-per-event": "Revenue / Event",
  "next-7-days": "Next 7 Days",
  "underperformer": "Slowest Product",
  margin: "Net Margin",
  "labor-rate": "Labor %",
  "cost-overrun": "Cost Pressure",
};

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div className="edgeLights" />

      <div className="dashboardShell">
        <DashboardSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {isSidebarOpen && (
          <button
            type="button"
            className="sidebarBackdrop"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="main">

          <TopStrip onOpenSidebar={() => setIsSidebarOpen(true)} />

          <div className="mainScroll">
            <section className="kpiGrid" aria-label="At a glance metrics">
              {dashboardData.kpis.map((kpi) => {
                const Icon = kpiIconMap[kpi.id as keyof typeof kpiIconMap];

                return (
                  <KpiCard
                    key={kpi.id}
                    icon={<Icon />}
                    trend={kpi.trend}
                    value={kpi.value}
                    eyebrow={KPI_LABELS[kpi.id]}
                    sub={kpi.sub}
                  />
                );
              })}
            </section>

            <section className="contentRow" aria-label="Dashboard content">
              <div className="colExpense">
                <ExpenseGroups />
              </div>

              <div className="colMain">
                <TopProducts />
                <RevenueByMonth />
              </div>

<div className="colSide">
  <div className="notesPanel">
    <Notes />
  </div>

  <MonthlyTargets />
</div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}