import styles from './StoryOptions.module.css';

export default function StoryOptions({options, onOptionClick}) {
  return (
    <div>
      { options.map((option, i) => {
        return (
          <div
            key={i}
            onClick={() => onOptionClick(option, i)}
            className={styles.option}
          >
            {option.text}
          </div>
        );
      })}
    </div>
  );
}
