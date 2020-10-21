import React from "react";
import styles from "./PageFooter.module.css";
const links = [
  { label: "Sobre nós" },
  { label: "Quem somos" },
  { label: "Visão, Missão, Valores" },
  { label: "Parceiros" },
  { label: "Como Ajudar" },
  { label: "Contactos" },
];
export default function PageFooter() {
  return (
    <div className={styles.container}>
      {links.map(function (link) {
        return <div className={styles.link}>{link.label}</div>;
      })}
      <div className={styles.trademark}>
      Casa Damião @2020
      </div>
    </div>
  );
}
