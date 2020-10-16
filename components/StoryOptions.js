import styles from "./StoryOptions.module.css";
import shuffleArray from "shuffle-array";

export default function StoryOptions({
  currenOption,
  onOptionClick,
  showQuestion = true,
}) {
  return (
    <div>
      {showQuestion && (
        <div className={styles.question}>{currenOption.question}</div>
      )}
      <div className={styles.caroussel}>
        {currenOption.options.map((option, i) => {
          return (
            <div
              key={i}
              onClick={() => onOptionClick(option, i)}
              className={`${styles.option}`}
            >
              <img src="/images/icon-placeholder.png"></img>
              <div>{option.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
