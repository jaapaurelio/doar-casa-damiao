import React from "react";
import styles from "./Stats.module.css";
import Link from "next/link";

export default function Stats() {
  return (
    <div className={styles.container}>
      <img src="/images/heart-pulsing.gif"></img>
      <div className={styles.lineContainer}>
        <div className={styles.line}>
          <span className={styles.strong}>132</span> histórias criadas.
        </div>
        <div className={styles.line}>
          <span className={styles.strong}>57</span> doações.
        </div>
        <div className={styles.line}>
          <span className={styles.strong}>1.134€</span> angariados.
        </div>
      </div>
      <div className={styles.actionButton}>
        <Link href="/doar">
          <button className="btn-primary">Doar</button>
        </Link>
      </div>
    </div>
  );
}
