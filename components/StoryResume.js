import styles from "./StoryResume.module.css";
import { STEP_TYPE } from "../constants/story_constants";

export default function StoryResume({ selectedStoryPlot, plots }) {
  let currentOption = plots;
  const a = [...selectedStoryPlot];

  const story = a.reduce((text, selectedOption) => {
    if (selectedOption.type == STEP_TYPE.OPTIONS && currentOption.options) {
      const option = currentOption.options.find(
        (option) => option.id === selectedOption.value
      );

      text = [
        ...text,
        <img className={styles.image} src="/images/icon-placeholder.png"></img>,
      ];

      currentOption = option;
      return text;
    }

    return text;
  }, []);

  return [story];
}
