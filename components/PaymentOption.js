import React from "react";
import styles from "./PaymentOption.module.css";

export default function PaymentOption({ label, selected, onClick, icons }) {
  return (
    <div className={styles.paymentMethodSelection}>
      <div className={styles.clickArea} onClick={onClick}>
        <input
          type="radio"
          name="payment-type"
          checked={selected}
          readOnly
        ></input>
        {label}
        <div className={styles.methodIcons}>
          {icons.map(function (icon) {
            return <img src={icon}></img>;
          })}
        </div>
      </div>
    </div>
  );
}
