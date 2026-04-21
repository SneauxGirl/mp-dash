"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./TopProducts.module.scss";
import { dashboardData } from "@/data/dashboardData";

import popcorn from "@/app/assets/icons/products/corn.png";
import lemonade from "@/app/assets/icons/products/lemonade.png";
import cotton from "@/app/assets/icons/products/cotton.png";

type ViewMode = "mtd" | "ytd";

type TopProductRecord = (typeof dashboardData.topProductMonthly)[number];

const productIconMap = {
  Kettlecorn: popcorn,
  "Caramel Corn": popcorn,
  "Cheese Corn": popcorn,
  Lemonade: lemonade,
  "Flavored Lemonade": lemonade,
  "Cotton Candy": cotton,
} as const;

function formatProductName(name: string) {
  return name;
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatGrowth(value: number) {
  return `${value > 0 ? "+" : ""}${value}%`;
}

function getBadgeClass(status: string) {
  return status === "Great" || status === "Strong" ? styles.good : styles.muted;
}

function getGrowthClass(value: number) {
  return value >= 0 ? styles.up : styles.down;
}

function buildYtdRows(rows: readonly TopProductRecord[]) {
  const byProduct = new Map<string, TopProductRecord[]>();

  rows.forEach((row) => {
    const existing = byProduct.get(row.product) ?? [];
    existing.push(row);
    byProduct.set(row.product, existing);
  });

  return Array.from(byProduct.entries()).map(([product, productRows]) => {
    const sortedRows = [...productRows].sort((a, b) =>
      a.month.localeCompare(b.month),
    );

    const latestRow = sortedRows[sortedRows.length - 1];

    const locationRevenueProxy = new Map<string, number>();
    const locationTypeMap = new Map<string, TopProductRecord["locationType"]>();
    const locationShareMap = new Map<string, number>();

    sortedRows.forEach((row) => {
      const weightedRevenue = row.revenue * (row.topLocationSharePct / 100);

      locationRevenueProxy.set(
        row.topLocation,
        (locationRevenueProxy.get(row.topLocation) ?? 0) + weightedRevenue,
      );

      locationTypeMap.set(row.topLocation, row.locationType);

      locationShareMap.set(
        row.topLocation,
        Math.max(
          locationShareMap.get(row.topLocation) ?? 0,
          row.topLocationSharePct,
        ),
      );
    });

    const [topLocation] = [...locationRevenueProxy.entries()].sort(
      (a, b) => b[1] - a[1],
    )[0] ?? [latestRow.topLocation, 0];

    const totalUnitsSold = sortedRows.reduce(
      (sum, row) => sum + row.unitsSold,
      0,
    );
    const totalRevenue = sortedRows.reduce((sum, row) => sum + row.revenue, 0);

    return {
      product,
      type: latestRow.type,
      locationType: locationTypeMap.get(topLocation) ?? latestRow.locationType,
      topLocation,
      topLocationSharePct:
        locationShareMap.get(topLocation) ?? latestRow.topLocationSharePct,
      unitsSold: totalUnitsSold,
      revenue: totalRevenue,
      growthPct: latestRow.growthPct,
      growthBasis: latestRow.growthBasis,
      status: latestRow.status,
    };
  });
}

export default function TopProducts() {
  const [viewMode, setViewMode] = useState<ViewMode>("mtd");
  const [isMidViewport, setIsMidViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 900px) and (max-width: 1400px)",
    );

    const updateMatch = () => {
      setIsMidViewport(mediaQuery.matches);
    };

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => {
      mediaQuery.removeEventListener("change", updateMatch);
    };
  }, []);

  const currentMonth = dashboardData.currentMonth.month;
  const allRows = dashboardData.topProductMonthly;

  const visibleRows = useMemo(() => {
    const sourceRows =
      viewMode === "mtd"
        ? allRows.filter((row) => row.month === currentMonth)
        : buildYtdRows(allRows);
    const rowLimit = isMidViewport ? 5 : 4;

    return [...sourceRows]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, rowLimit);
  }, [allRows, currentMonth, isMidViewport, viewMode]);

  const subtitle =
    viewMode === "mtd"
      ? `${dashboardData.topProductCatalog.length} Products in Month To Date`
      : `${dashboardData.topProductCatalog.length} Products Year To Date`;

  return (
    <section className={`panel ${styles.topProducts}`}>
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <header className={styles.header}>
          <div>
            <div className="eyebrow">Performance</div>
            <h2 className={styles.title}>Top Products</h2>
            <p className={styles.sub}>{subtitle}</p>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={viewMode === "ytd" ? styles.modePill : styles.datePill}
              onClick={() => setViewMode("ytd")}
              aria-pressed={viewMode === "ytd"}
            >
              Year To Date
            </button>

            <button
              type="button"
              className={viewMode === "mtd" ? styles.modePill : styles.datePill}
              onClick={() => setViewMode("mtd")}
              aria-pressed={viewMode === "mtd"}
            >
              Month To Date
            </button>
          </div>
        </header>

        <div className={styles.tableWrap}>
          <div className={styles.tableHead}>
            <span>Product</span>
            <span>Top Location</span>
            <span>Net Sales</span>
            <span>Growth</span>
            <span>Revenue</span>
            <span>Status</span>
          </div>

          <div className={styles.tableBody}>
            {visibleRows.map((row) => (
              <div className={styles.row} key={`${viewMode}-${row.product}`}>
                <div className={styles.product}>
                  <div className={styles.avatar}>
                    <Image
                      src={
                        productIconMap[
                          row.product as keyof typeof productIconMap
                        ]
                      }
                      alt=""
                      className={styles.productIcon}
                    />
                  </div>

                  <div className={styles.productInfo}>
                    <strong className={styles.productName}>
                      {formatProductName(row.product)}
                    </strong>
                    <span className={styles.productType}>{row.type}</span>
                  </div>
                </div>

                <span className={styles.dist}>{row.topLocation}</span>
                <span className={styles.sales}>
                  {formatNumber(row.unitsSold)}
                </span>
                <span
                  className={`${styles.growth} ${getGrowthClass(row.growthPct)}`}
                >
                  {formatGrowth(row.growthPct)}
                </span>
                <span className={styles.revenue}>
                  {formatCurrency(row.revenue)}
                </span>
                <span
                  className={`${styles.badge} ${getBadgeClass(row.status)}`}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.link}>
            View All
          </button>
        </div>
      </div>
    </section>
  );
}
