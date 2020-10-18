import styles from "./Story.module.css";
import { gumStory } from "../constants/story_constants";

export default function Story({ selectedStoryPlot, plots, title, author }) {
  let currentOption = plots;
  selectedStoryPlot = selectedStoryPlot || [];
  const story = selectedStoryPlot.reduce((text, selectedOption) => {
    if (selectedOption && currentOption.options) {
      const option = currentOption.options.find(
        (option) => option.id === selectedOption.value
      );

      text = [
        ...text,
        <img className={styles.image} src="/images/icon-placeholder.png"></img>,
        <br></br>,
      ];

      currentOption = option;
      return text;
    }

    return text;
  }, []);

  return (
    <div className={styles.mainStory}>
      {title != undefined && <h1>{title}</h1>}
      {author != undefined && (
        <div className={styles.author}>
          Criada pela Casa Damião com ajuda de{" "}
          <span className={styles.authorName}>{author}</span>
        </div>
      )}

      <div>
        {gumStory.map((line) => {
          if (line.src) {
            return <img src={line.src}></img>;
          }

          return <p>{line}</p>;
        })}
      </div>
    </div>
  );
}
