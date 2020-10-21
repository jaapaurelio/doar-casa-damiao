import React from "react";
import styles from "./Title.module.css";

export default function Title({ mainText, subText }) {
  return (
    <h1 className={styles.container}>
      <span className={styles.mainTitle}>{mainText}</span>
      <span className={styles.mainTitleSub}>{subText}</span>
    </h1>
  );
}
