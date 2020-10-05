import React, { useState } from "react";

import styles from "./StoryInput.module.css";

export default function StoryInput({ step, onButtonClick }) {
  if (!step) {
    return '';
  }
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div>{step.input.text}</div>
      <div>
        <input
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className={styles.inputform}
          placeholder="introduzir nome"
          type="text"
        ></input>
        <button
          className={styles.continuebtn}
          onClick={() => onButtonClick(inputValue, step)}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
