import styles from "./StoryOptions.module.css";
export default function StoryOptions({ options, onOptionClick }) {
  return (
    <div className={styles.caroussel}>
        {options.map((option, i) => {
          return (
            <div
              key={i}
              onClick={() => onOptionClick(option, i)}
              className={styles.option}
            >
              <img src="/images/icon-placeholder.png"></img>
              <div>{option.text}</div>
              <div className={styles.button}>Selecionar</div>
            </div>
          );
        })}
    </div>
  );
}
