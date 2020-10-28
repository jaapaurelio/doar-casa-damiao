import styles from "./StoryOptions.module.css";
import StoryOption from "./StoryOption";

export default function StoryOptions({
  currenOption,
  onOptionClick,
  showQuestion = true
}) {
  return (
    <div>
      {showQuestion && <h2>{currenOption.question}</h2>}
      <div className={styles.caroussel}>
        {currenOption.options.map((option, i) => {
          return (
            <StoryOption
              onClick={() => onOptionClick(option, i)}
              image={`/images/characters/${option.character}.svg`}
              text={option.text}
            ></StoryOption>
          );
        })}
      </div>
    </div>
  );
}
