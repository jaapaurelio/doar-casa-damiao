import styles from "./StoryOptions.module.css";
import StoryOption from "./StoryOption";

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
            <div key={i}>
              <StoryOption
                onClick={() => onOptionClick(option, i)}
                image="/images/icon-placeholder.png"
                text={option.text}
              ></StoryOption>
            </div>
          );
        })}
      </div>
    </div>
  );
}
