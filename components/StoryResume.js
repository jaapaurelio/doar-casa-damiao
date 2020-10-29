import styles from './StoryResume.module.css';
import { STEP_TYPE } from '../constants/story_constants';
import StoryOption from '../components/StoryOption';

export default function StoryResume({ selectedStoryPlot, plots }) {
    let currentOption = plots;
    const a = [...selectedStoryPlot];

    const story = a.reduce((text, selectedOption, i) => {
        if (selectedOption.type == STEP_TYPE.OPTIONS && currentOption.options) {
            const option = currentOption.options.find(
                (option) => option.id === selectedOption.value
            );

            text = [
                ...text,
                <div key={i}>
                    <StoryOption
                        image={`/images/characters/${option.character}.svg`}
                        text={option.text}
                        readOnly={true}></StoryOption>
                </div>,
            ];

            currentOption = option;
            return text;
        }

        return text;
    }, []);

    return <div className={styles.container}>{story}</div>;
}
