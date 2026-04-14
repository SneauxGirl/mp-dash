import styles from "./TopProducts.module.scss";

import Image from "next/image";

import popcorn from "@/app/assets/icons/products/corn.png";
import lemonade from "@/app/assets/icons/products/lemonade.png";
import cotton from "@/app/assets/icons/products/cotton.png";

export default function TopProducts() {

  return (
    <section className={`panel ${styles.topProducts}`}>
      <div className="panelTopline" />

      <div className={`panelContent ${styles.inner}`}>
        <header className={styles.header}>
          <div>
            <div className="eyebrow">Performance</div>
            <h2 className={styles.title}>Top Products</h2>
            <p className={styles.sub}>160 Products from 24 Categories</p>
          </div>

          <div className={styles.controls}>
            <span className={styles.datePill}>Year To Date</span>
            <span className={styles.modePill}>Month To Date</span>
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
            {/* Row */}
<div className={styles.row}>
  <div className={styles.product}>
    <div className={styles.avatar}>
      <img src={popcorn.src} alt="" className={styles.productIcon} />
    </div>
    <div className={styles.productInfo}>
      <strong className={styles.productName}>Kettlecorn</strong>
      <span className={styles.productType}>Food / Retail</span>
    </div>
  </div>

  <span className={styles.dist}>Sams Club</span>
  <span className={styles.sales}>4,723</span>
  <span className={`${styles.growth} ${styles.up}`}>+42%</span>
  <span className={styles.revenue}>$3,568,000</span>
  <span className={`${styles.badge} ${styles.good}`}>Great</span>
</div>

<div className={styles.row}>
  <div className={styles.product}>
    <div className={styles.avatar}>
      <img src={popcorn.src} alt="" className={styles.productIcon} />
    </div>
    <div className={styles.productInfo}>
      <strong className={styles.productName}>Caramel Corn</strong>
      <span className={styles.productType}>Food / Stadium</span>
    </div>
  </div>

  <span className={styles.dist}>Cal Expo</span>
  <span className={styles.sales}>4,101</span>
  <span className={`${styles.growth} ${styles.down}`}>-19%</span>
  <span className={styles.revenue}>$2,844,000</span>
  <span className={`${styles.badge} ${styles.muted}`}>Good</span>
</div>

<div className={styles.row}>
  <div className={styles.product}>
    <div className={styles.avatar}>
      <img src={lemonade.src} alt="" className={styles.productIcon} />
    </div>
    <div className={styles.productInfo}>
      <strong className={styles.productName}>Lemonade</strong>
      <span className={styles.productType}>Beverage / Stadium</span>
    </div>
  </div>

  <span className={styles.dist}>Golden 1</span>
  <span className={styles.sales}>3,872</span>
  <span className={`${styles.growth} ${styles.up}`}>+31%</span>
  <span className={styles.revenue}>$2,611,000</span>
  <span className={`${styles.badge} ${styles.good}`}>Strong</span>
</div>

<div className={styles.row}>
  <div className={styles.product}>
    <div className={styles.avatar}>
      <img src={cotton.src} alt="" className={styles.productIcon} />
    </div>
    <div className={styles.productInfo}>
      <strong className={styles.productName}>Cotton Candy</strong>
      <span className={styles.productType}>Food / Stadium</span>
    </div>
  </div>

  <span className={styles.dist}>Sutter Health Park</span>
  <span className={styles.sales}>3,114</span>
  <span className={`${styles.growth} ${styles.down}`}>-8%</span>
  <span className={styles.revenue}>$1,925,000</span>
  <span className={`${styles.badge} ${styles.muted}`}>Stable</span>
</div>
</div>
</div>

        <div className={styles.footer}>
          <button className={styles.link}>View All</button>
        </div>
      </div>
    </section>
  );
}